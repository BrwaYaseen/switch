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
    baseWhereInput.AND = [
      {
        user: {
          NOT: {
            blockedBy: {
              some: {
                blockerId: userId,
              },
            },
          },
        },
      },
      {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
      },
    ];
  }

  const streams = await db.stream.findMany({
    where: baseWhereInput,
    select: {
      user: true,
      id: true,
      name: true,
      isLive: true,
      thumbnailUrl: true,
      updatedAt: true,
    },
    orderBy: [
      { isLive: "desc" as Prisma.SortOrder },
      { updatedAt: "desc" as Prisma.SortOrder },
    ],
  });

  return streams;
};
