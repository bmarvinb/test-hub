export interface ContactDTO {
  email: string;
  question: string;
}

export interface ContactService {
  send: (payload: ContactDTO) => Promise<void>;
}

export const ContactService: ContactService = {
  send: async (payload) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    return result;
  },
};
