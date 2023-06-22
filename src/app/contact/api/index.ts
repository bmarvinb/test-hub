export interface ContactDTO {
  email: string;
  question: string;
}

export interface ContactService {
  send: (payload: ContactDTO) => Promise<void>;
}

export const ContactService: ContactService = {
  send: async (payload) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const error = await res.json();
        return Promise.reject(error?.error);
      }
      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
