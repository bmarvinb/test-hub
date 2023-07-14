import { MutateTest, Test } from "@/shared/models/test-model";
import { TestModel, testModel } from "../models/test-model";

export interface TestService {
  find(id: string): Promise<Test | null>;
  create(test: MutateTest): Promise<Test>;
  update(id: string, test: MutateTest): Promise<Test>;
}

export const testService = (model: TestModel = testModel): TestService => {
  return {
    find: async (id) => {
      const test = await model.find(id);
      return test;
    },

    create: async (data) => {
      const test = await model.create(data);
      return test;
    },

    update: async (id, data) => {
      const test = await model.update(id, data);
      return test;
    },
  };
};
