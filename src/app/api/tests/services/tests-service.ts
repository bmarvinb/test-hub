import prisma from "@/lib/prisma";
import { CreateTestDTO } from "@/shared/dtos/test-dto";

export interface TestsService {
  create(test: CreateTestDTO): Promise<{ id: string }>;
}

export const testsService: TestsService = {
  create: async (testDTO: CreateTestDTO) => {
    try {
      // TODO: before moving on, read Prisma documentation
      const { id } = await prisma.test.create({
        data: {
          title: testDTO.title,
          description: testDTO.description,
        },
      });

      return { id };
    } catch (error) {
      console.error("Test creation failed", error);
      throw error;
    }
  },
};
