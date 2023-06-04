import prisma from "@/lib/prisma";

export interface TestDTO {
  id: string;
  title: string;
  description: string | null;
  tags: {
    id: string;
    title: string;
  }[];
}

export class TestsRepository {
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
  }
}
