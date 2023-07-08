"use client";

import {
  ContactForm,
  ContactFormModel,
} from "@/app/[lng]/contact/components/ContactForm";
import {
  ContactError,
  ContactDTO,
  contactService,
} from "@/app/[lng]/contact/services/contact";
import { useTranslation } from "@/app/i18n/client";
import { Title } from "@/components/ui/Title";
import { useToast } from "@/lib/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export interface ContactPageProps {
  params: {
    lng: string;
  };
}

export default function ContactPage(props: ContactPageProps) {
  const { t } = useTranslation(props.params.lng, "contact-page");
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
          title: t("successTitleMessage"),
          description: t("successDescriptionMessage"),
        });
      },
      onError: (error) => {
        toast.toast({
          variant: "destructive",
          title: t("errorTitleMessage"),
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
      <Title size={"h1"} data-testid="page-title">
        {t("title")}
      </Title>

      <ContactForm
        lng={props.params.lng}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
      />
    </div>
  );
}
