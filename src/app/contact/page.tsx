"use client";

import {
  ContactForm,
  ContactFormModel,
} from "@/app/contact/components/ContactForm";
import {
  ContactError,
  ContactDTO,
  contactService,
} from "@/app/contact/services/contact";
import { Title } from "@/components/ui/Title";
import { useToast } from "@/lib/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export default function ContactPage() {
  const toast = useToast();
  const {
    mutate: send,
    isLoading,
    isError,
    isSuccess,
  } = useMutation<void, ContactError, ContactDTO>(
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
      <Title size={"h1"}>Contact us</Title>

      <ContactForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
      />
    </div>
  );
}
