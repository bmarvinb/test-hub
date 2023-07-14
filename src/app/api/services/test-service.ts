import { MutateTestData, TestData } from "@/shared/models/test-model";
import { TestModel, testModel } from "../models/test-model";

export interface TestService {
  findAll(): Promise<TestData[]>;
  find(id: string): Promise<TestData | null>;
  create(test: MutateTestData): Promise<TestData>;
  update(id: string, test: MutateTestData): Promise<TestData>;
}

export const testService = (model: TestModel = testModel): TestService => {
  return {
    findAll: async () => {
      const tests = await model.findAll();
      return tests;
    },

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
