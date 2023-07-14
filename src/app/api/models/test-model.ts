import prisma from "@/lib/prisma";
import { MutateTest, Test } from "@/shared/models/test-model";
import client from "@prisma/client";

function toJSON(test: client.Test): Test {
  return {
    id: test.id,
    title: test.title,
    description: test.description,
  };
}

export interface TestModel {
  find(id: string): Promise<Test | null>;
  create(data: MutateTest): Promise<Test>;
  update(id: string, data: MutateTest): Promise<Test>;
}

export const testModel: TestModel = {
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
