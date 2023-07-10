"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export type TestFormModel = z.infer<typeof testFormSchema>;

export interface TestFormProps {
  data: TestFormModel;
  onSubmit: (data: TestFormModel) => void;
}

export const TEST_FORM_ID = "test-editor-form";

const testFormSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const TestForm = (props: TestFormProps) => {
  const form = useForm<TestFormModel>({
    resolver: zodResolver(testFormSchema),
    defaultValues: {
      title: props.data.title,
      description: props.data.description,
    },
  });

  return (
    <Form {...form}>
      <form
        id={TEST_FORM_ID}
        onSubmit={form.handleSubmit(props.onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
