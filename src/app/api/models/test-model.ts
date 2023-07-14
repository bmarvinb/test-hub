import prisma from "@/lib/prisma";
import { MutateTestData, TestData } from "@/shared/models/test-model";
import { Test } from "@prisma/client";

function toJSON(test: Test): TestData {
  return {
    id: test.id,
    title: test.title,
    description: test.description,
  };
}

export interface TestModel {
  findAll(): Promise<TestData[]>;
  find(id: string): Promise<TestData | null>;
  create(data: MutateTestData): Promise<TestData>;
  update(id: string, data: MutateTestData): Promise<TestData>;
}

export const testModel: TestModel = {
  findAll: async () => {
    const tests = await prisma.test.findMany();
    return tests.map(toJSON);
  },

  find: async (id) => {
    const test = await prisma.test.findUnique({
      where: {
        id,
      },
    });

    if (!test) {
      return null;
    }

    return toJSON(test);
  },

  create: async (data) => {
    const test = await prisma.test.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });

    return toJSON(test);
  },

  update: async (id, data) => {
    const test = await prisma.test.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        description: data.description,
      },
    });

    return toJSON(test);
  },
};
