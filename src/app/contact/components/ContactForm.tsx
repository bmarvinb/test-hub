"use client";

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

export interface ContactFormProps {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  onSubmit: (email: string, question: string) => void;
}

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  question: z.string(),
});

export const ContactForm = (props: ContactFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      question: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    props.onSubmit(values.email, values.question);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={props.isLoading}
                  placeholder="Please provide your email"
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
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea
                  disabled={props.isLoading}
                  placeholder="Your question"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ask whenever you have a question.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={props.isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
