"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/Textarea";
import { Title } from "@/components/ui/Title";
import { NewQuestionDialog } from "./NewQuestionDialog";

export interface TestEditorProps {
  onSubmit: (data: TestEditorModel) => void;
}

export type TestEditorModel = z.infer<typeof formSchema>;

const TestTag = z.object({
  id: z.string(),
  name: z.string(),
});

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(TestTag),
});

export const TestEditor = (_props: TestEditorProps) => {
  const form = useForm<TestEditorModel>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (values: TestEditorModel) => {
    console.log("values", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <div className="flex justify-between items-center">
          <Title size="h2">Questions</Title>
          <NewQuestionDialog />
        </div>

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};
