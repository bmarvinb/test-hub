import { useMutation } from "@tanstack/react-query";
import { ContactService } from "../api";

const useContactHook = (
  api: ContactService,
  onError: (error: string) => void,
  onSuccess: () => void
) => {
  const {
    mutate: send,
    error,
    status,
  } = useMutation<void, string, { email: string; question: string }>(
    async ({ email, question }) => {
      return api.send({ email, question });
    },
    {
      onSuccess,
      onError,
    }
  );

  return {
    send,
    status,
    error,
  };
};

export default useContactHook;
