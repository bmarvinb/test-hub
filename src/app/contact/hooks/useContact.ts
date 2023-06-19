import { useMutation } from "@tanstack/react-query";
import { ContactService } from "../api";

const useContactHook = (api: ContactService) => {
  const {
    mutate: send,
    error,
    status,
  } = useMutation<void, string, { email: string; question: string }>(
    async ({ email, question }) => {
      return api.send({ email, question });
    }
  );

  return {
    send,
    status,
    error,
  };
};

export default useContactHook;
