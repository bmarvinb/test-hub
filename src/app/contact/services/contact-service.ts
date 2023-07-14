import { client } from "@/lib/client";
import { ContactData, contactErrorSchema } from "@/shared/models/contact-model";

interface ContactService {
  send: (data: ContactData) => Promise<void>;
}

const contactService: ContactService = {
  send: async (data) => {
    try {
      await client.post("/api/contact", JSON.stringify(data));
    } catch (error) {
      const result = contactErrorSchema.safeParse(error);
      if (!result.success) {
        throw new Error("Invalid response from server");
      }
      throw error;
    }
  },
};

export type { ContactService };
export { contactService };
