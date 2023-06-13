import prisma from "@/lib/prisma";

interface TagDTO {
  id: string;
  title: string;
}

export interface TestDTO {
  id: string;
  title: string;
  description: string | null;
  tags: TagDTO[];
}

export const testsService = {
  async getAll(): Promise<TestDTO[]> {
    return await prisma.test.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        description: true,
        tags: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  },
};
