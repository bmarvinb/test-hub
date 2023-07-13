import { MutateTestDTO } from "@/shared/dtos/test-dto";
import prisma from "@/lib/prisma";
import { Test } from "@prisma/client";

export interface TestModel {
  find(id: string): Promise<Test | null>;
  create(data: MutateTestDTO): Promise<Test>;
  update(id: string, data: MutateTestDTO): Promise<Test>;
}

export const testModel: TestModel = {
  find: async (id) => {
    const test = await prisma.test.findUnique({
      where: {
        id,
      },
    });

    return test;
  },

  create: async (data) => {
    return await prisma.test.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });
  },

  update: async (id, data) => {
    return await prisma.test.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        description: data.description,
      },
    });
  },
};
