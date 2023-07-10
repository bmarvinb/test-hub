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
import { Mode } from "@/lib/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export type TestFormModel = z.infer<typeof testFormSchema>;

type CreateFormData = {
  mode: Mode.Create;
};

type EditFormData = {
  mode: Mode.Edit;
  test: TestFormModel;
};

export type FormData = CreateFormData | EditFormData;

function isEditMode(context: FormData): context is EditFormData {
  return context.mode === Mode.Edit;
}

export interface TestFormProps {
  data?: FormData;
  onSubmit: (data: TestFormModel) => void;
}

export const TEST_FORM_ID = "test-editor-form";

const testFormSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  description: z.string().min(1, "Description cannot be empty"),
});

export const TestForm = ({
  data = { mode: Mode.Create },
  onSubmit,
}: TestFormProps) => {
  const defaultValues = isEditMode(data)
    ? {
        title: data.test.title,
        description: data.test.description,
      }
    : {
        title: "",
        description: "",
      };
  const form = useForm<TestFormModel>({
    resolver: zodResolver(testFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        id={TEST_FORM_ID}
        onSubmit={form.handleSubmit(onSubmit)}
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
