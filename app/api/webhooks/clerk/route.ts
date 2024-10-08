import { resetIngresses } from "@/actions/ingress";
import { db } from "@/lib/db";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret is missing");
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  console.log("Payload data:", payload.data);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new Response(`Verification error: ${error}`, { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    try {
      await db.user.create({
        data: {
          externalUserId: payload.data.id,
          username: payload.data.username,
          imageUrl: payload.data.image_url,
          stream: {
            create: {
              name: `${payload.data.username}'s stream`,
            },
          },
        },
      });
    } catch (dbError) {
      console.error("Database error:", JSON.stringify(dbError, null, 2));
      return new Response("Internal Server Error", { status: 500 });
    }
  }
  if (eventType === "user.updated") {
    try {
      await db.user.update({
        where: {
          externalUserId: payload.data.id,
        },
        data: {
          username: payload.data.username,
          imageUrl: payload.data.image_url,
        },
      });
    } catch (dbError) {
      console.error("Database error:", JSON.stringify(dbError, null, 2));
      return new Response("Internal Server Error", { status: 500 });
    }
  }
  if (eventType === "user.deleted") {
    try {
      await resetIngresses(payload.data.id);
      await db.user.delete({
        where: {
          externalUserId: payload.data.id,
        },
      });
    } catch (dbError) {
      console.error("Database error:", JSON.stringify(dbError, null, 2));
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  return new Response("Webhook processed successfully", { status: 200 });
}
