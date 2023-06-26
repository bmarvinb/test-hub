import { ContactService } from "@/app/contact/services/contact";
import { useMutation } from "@tanstack/react-query";

export interface ContactHookHandlers {
  onError: (message: string) => void;
  onSuccess: () => void;
}

export const useContactHook = (
  api: ContactService,
  { onError, onSuccess }: ContactHookHandlers
) => {
  const {
    mutate: send,
    error,
    status,
  } = useMutation<
    void,
    { message: string; errors?: unknown[] },
    { email: string; question: string }
  >(async ({ email, question }) => api.send({ email, question }), {
    onSuccess,
    onError: (error) => {
      onError(error.message);
    },
  });

  return {
    send,
    status,
    error,
  };
};
