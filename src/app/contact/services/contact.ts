import { client } from "@/lib/client";
import { z } from "zod";

interface ContactService {
  send: (data: ContactDTO) => Promise<void>;
}

type ContactDTO = {
  email: string;
  question: string;
};

type ContactError = z.infer<typeof errorSchema>;

const errorSchema = z.object({
  message: z.number(),
  issues: z.unknown().array().optional(),
});

const contactService: ContactService = {
  send: async (data) => {
    try {
      await client.post("/api/contact", JSON.stringify(data));
    } catch (error) {
      const result = errorSchema.safeParse(error);
      if (!result.success) {
        throw new Error("Invalid response from server");
      }
      throw error;
    }
  },
};

export type { ContactService, ContactDTO, ContactError };
export { contactService };
