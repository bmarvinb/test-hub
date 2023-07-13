import { client } from "@/lib/client";
import { MutateTest } from "@/shared/models/test";

interface TestsService {
  find: (id: string) => Promise<unknown>;
  create: (data: MutateTest) => Promise<void>;
  update: (id: string, data: MutateTest) => Promise<void>;
}

const ROUTE = "/api/tests";

const testsService: TestsService = {
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

export type { TestsService };

export { testsService };
