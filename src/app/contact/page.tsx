"use client";

import { ContactForm } from "@/app/contact/components/ContactForm";
import { useContactHook } from "@/app/contact/hooks/useContact";
import { contactService } from "@/app/contact/services/contact";
import { useToast } from "@/lib/hooks/use-toast";

export default function ContactPage() {
  const toast = useToast();

  const { send, status } = useContactHook(contactService, {
    onError: (message) => {
      toast.toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
    },
    onSuccess: () => {
      toast.toast({
        title: "Success",
        description: "We will contact you soon.",
      });
    },
  });

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
