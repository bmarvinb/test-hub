import { CreateTestDTO } from "@/shared/dtos/test-dto";
// import { TestModel } from "../models/test-model";
import prisma from "@/lib/prisma";

export interface TestsService {
  create(test: CreateTestDTO): Promise<{ id: string }>;
}

export const testsService: TestsService = {
  create: async (testDTO: CreateTestDTO) => {
    // const test = new TestModel(testDTO);

    try {
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
