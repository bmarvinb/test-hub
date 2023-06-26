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
  send: async (data) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        console.error("Error while sending email", error);
        return Promise.reject(error);
      }
      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
