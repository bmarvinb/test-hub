import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/Textarea";
import { useTranslation } from "@/app/i18n/client";

export type ContactFormModel = z.infer<typeof formSchema>;

export interface ContactFormProps {
  lng: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  onSubmit: (data: ContactFormModel) => void;
}

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address", // TODO: how to translate this?
  }),
  question: z.string(),
});

export const ContactForm = (props: ContactFormProps) => {
  const { t } = useTranslation(props.lng, "contact-page");

  const form = useForm<ContactFormModel>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      question: "",
    },
  });

  const onSubmit = (values: ContactFormModel) => {
    props.onSubmit({
      email: values.email,
      question: values.question,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("emailLabel")}</FormLabel>
              <FormControl>
                <Input
                  disabled={props.isLoading}
                  placeholder={t("emailPlaceholder")}
                  data-testid="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("questionLabel")}</FormLabel>
              <FormControl>
                <Textarea
                  disabled={props.isLoading}
                  placeholder={t("questionPlaceholder")}
                  data-testid="question"
                  {...field}
                />
              </FormControl>
              <FormDescription>{t("questionDescription")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={props.isLoading} data-testid="submit">
          {t("submitButton")}
        </Button>
      </form>
    </Form>
  );
};
