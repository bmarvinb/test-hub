"use client";

import {
  ContactForm,
  ContactFormModel,
} from "@/app/contact/components/ContactForm";
import {
  ContactDTO,
  BackendError as ServerError,
  contactService,
} from "@/app/contact/services/contact";
import { useToast } from "@/lib/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export default function ContactPage() {
  const toast = useToast();
  const {
    mutate: send,
    isLoading,
    isError,
    isSuccess,
  } = useMutation<void, ServerError, ContactDTO>(
    async (data) => contactService.send(data),
    {
      onSuccess: () => {
        toast.toast({
          title: "Success",
          description: "We will contact you soon.",
        });
      },
      onError: (error) => {
        toast.toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      },
    }
  );

  const onSubmit = (data: ContactFormModel) => {
    send({
      email: data.email,
      question: data.question,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Contact us</h1>

      <ContactForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
      />
    </div>
  );
}
