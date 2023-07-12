import { CreateTestDTO } from "@/shared/dtos/test-dto";
import { TestModel } from "../models/test-model";

export interface TestsService {
  create(test: CreateTestDTO): Promise<{ id: string }>;
}

export const testsService: TestsService = {
  create: async (testDTO: CreateTestDTO) => {
    const test = new TestModel(testDTO);

    try {
      const { id } = await test.create();

      return { id };
    } catch (error) {
      console.error("Test creation failed", error);
      throw error;
    }
  },
};
