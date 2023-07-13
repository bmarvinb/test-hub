import { MutateTestDTO, TestDTO } from "@/shared/dtos/test-dto";
import { TestModel, testModel } from "../models/test-model";
import { Test } from "@prisma/client";

function mapTestToDTO(test: Test): TestDTO {
  return {
    id: test.id,
    title: test.title,
    description: test.description,
  };
}

export interface TestService {
  find(id: string): Promise<TestDTO | null>;
  create(test: MutateTestDTO): Promise<TestDTO>;
  update(id: string, test: MutateTestDTO): Promise<TestDTO>;
}

export const testService = (model: TestModel = testModel): TestService => {
  return {
    find: async (id) => {
      const test = await model.find(id);
      if (!test) {
        return null;
      }
      return mapTestToDTO(test);
    },

    create: async (data) => {
      const test = await model.create(data);
      return mapTestToDTO(test);
    },

    update: async (id, data) => {
      const test = await model.update(id, data);
      return mapTestToDTO(test);
    },
  };
};
