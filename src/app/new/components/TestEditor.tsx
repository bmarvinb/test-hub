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
import { QuestionDialog } from "./QuestionDialog";
import {
  QuestionEditor,
  TestQuestion,
  TestQuestionModel,
} from "./QuestionEditor";
import { Label } from "@/components/ui/Label";
import { useState } from "react";
import { QuestionsList } from "./QuestionsList";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TestEditorProps {}

export type TestEditorModel = z.infer<typeof testEditorSchema>;

const testEditorSchema = z.object({
  title: z.string(),
  description: z.string(),
  questions: z.array(TestQuestion),
});

export const TestEditor = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<TestEditorModel>({
    resolver: zodResolver(testEditorSchema),
    defaultValues: {
      title: "",
      description: "",
      questions: [],
    },
  });

  const onTestEditorFormSubmit = (data: TestEditorModel) => {
    console.log("data", data);
  };

  const onQuestionFormSubmit = (question: TestQuestionModel) => {
    console.log("question on top level", question);
    form.setValue("questions", [...form.getValues().questions, question]);
    setIsDialogOpen(false);
  };

  const questions = form.watch("questions");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onTestEditorFormSubmit)}
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

        <div className="flex justify-between items-center">
          <Label>Questions</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDialogOpen(true)}
          >
            Add question
          </Button>
          <QuestionDialog isOpen={isDialogOpen}>
            <QuestionEditor onSubmit={onQuestionFormSubmit} />
          </QuestionDialog>
        </div>

        <QuestionsList questions={questions} />

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};
