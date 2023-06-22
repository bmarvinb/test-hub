"use client";

import { ContactService } from "./api";
import { ContactForm } from "./components/ContactForm";
import useContactHook from "./hooks/useContact";
import { useToast } from "@/lib/hooks/use-toast";

export default function ContactPage() {
  const toast = useToast();

  const { send, status } = useContactHook(
    ContactService,
    (error) => {
      toast.toast({
        variant: "destructive",
        title: "Oops",
        description: error,
      });
    },
    () => {
      toast.toast({
        title: "Hooray!",
        description: "We will contact you soon.",
      });
    }
  );

  const onSubmit = (email: string, question: string) => {
    send({ email, question });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Contact us</h1>

      <ContactForm
        onSubmit={onSubmit}
        isLoading={status === "loading"}
        isError={status === "error"}
        isSuccess={status === "success"}
      />
    </div>
  );
}
