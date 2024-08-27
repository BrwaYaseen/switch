import { getSelf } from "./auth-service";
import { db } from "./db";
import { Prisma } from "@prisma/client";

export const getSearch = async (term?: string) => {
  let userId: string | null;
  try {
    const self = await getSelf();
    if (!self) {
      throw new Error("Unauthorized");
    }
    userId = self.id;
  } catch {
    userId = null;
  }

  const baseWhereInput: Prisma.StreamWhereInput = {
    OR: [
      { name: { contains: term, mode: "insensitive" } },
      { user: { username: { contains: term, mode: "insensitive" } } },
    ],
  };

  if (userId) {
    baseWhereInput.user = {
      NOT: {
        blockedBy: {
          some: {
            blockerId: userId,
          },
        },
      },
    };
  }

  const streams = await db.stream.findMany({
    where: baseWhereInput,
    include: {
      user: true,
    },
    orderBy: [
      { isLive: "desc" as Prisma.SortOrder },
      { updatedAt: "desc" as Prisma.SortOrder },
    ],
  });

  return streams;
};