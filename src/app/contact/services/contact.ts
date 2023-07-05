import { client } from "@/lib/client";

export interface ContactDTO {
  email: string;
  question: string;
}

export interface ContactService {
  send: (data: ContactDTO) => Promise<void>;
}

export type BackendError<E = unknown> = {
  message: string;
  errors?: E[];
};

export const contactService: ContactService = {
  send: (data) => client.post("/api/contact", JSON.stringify(data)),
};
