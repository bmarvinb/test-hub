import { client } from "@/lib/client";
import { MutateTestData, TestData } from "@/shared/models/test-model";

export interface TestsService {
  findAll: () => Promise<TestData[]>;
  find: (id: string) => Promise<TestData>;
  create: (data: MutateTestData) => Promise<void>;
  update: (id: string, data: MutateTestData) => Promise<void>;
}

const ROUTE = "/api/tests";

export const testsService: TestsService = {
  findAll: async () => {
    return client.get(`${ROUTE}`);
  },

  find: async (id) => {
    return client.get(`${ROUTE}/${id}`);
  },

  create: async (data) => {
    return client.post(`${ROUTE}`, JSON.stringify(data));
  },

  update: async (id, data) => {
    return client.patch(`${ROUTE}/${id}`, JSON.stringify(data));
  },
};
