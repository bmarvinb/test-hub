import { CreateTestDTO } from "@/shared/dtos/test-dto";

export interface TestsService {
  create(test: CreateTestDTO): Promise<{ id: string }>;
}

export const testsService = {
  create: async (test: CreateTestDTO) => {
    console.log("Create test", test);
    return { id: "1" };
  },
};
