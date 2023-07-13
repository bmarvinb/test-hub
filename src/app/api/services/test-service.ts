import { MutateTest, Test } from "@/shared/models/test";
import { Test as TestEntity } from "@prisma/client";
import { TestModel, testModel } from "../models/test-model";

function mapTestToDTO(test: Test): Test {
  return {
    id: test.id,
    title: test.title,
    description: test.description,
  };
}

export interface TestService {
  find(id: string): Promise<TestEntity | null>;
  create(test: MutateTest): Promise<TestEntity>;
  update(id: string, test: MutateTest): Promise<TestEntity>;
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
