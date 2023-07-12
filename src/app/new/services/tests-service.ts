import { client } from "@/lib/client";
import { CreateTestDTO } from "@/shared/dtos/test-dto";

interface TestsService {
  create: (data: CreateTestDTO) => Promise<void>;
}

const testsService: TestsService = {
  create: async (data) => {
    const res = await client.post("/api/tests", JSON.stringify(data));
    console.log(res);
  },
};

export type { TestsService };

export { testsService };
