"use client";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Textarea } from "@/components/ui/Textarea";
import { QuestionType } from "@/shared/models/test-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TextInputQuestion } from "../../models/test-editor-model";

export interface TextBasedQuestionFormProps {
  initialData?: TextInputQuestion;
  onSubmit: (data: TextInputQuestion) => void;
}

const TextBasedQuestionSchema = z.object({
  question: z.string().min(1, "Question cannot be empty"),
  answer: z.string().min(1, "Answer cannot be empty"),
});

export const TextBasedQuestionForm = ({
  initialData,
  onSubmit,
}: TextBasedQuestionFormProps) => {
  const isEditMode = initialData !== undefined;
  const defaultValues = isEditMode
    ? {
        question: initialData.question,
        answer: initialData.answer,
      }
    : {};

  const form = useForm<z.infer<typeof TextBasedQuestionSchema>>({
    resolver: zodResolver(TextBasedQuestionSchema),
    defaultValues,
  });

  const handleSubmit = (values: z.infer<typeof TextBasedQuestionSchema>) => {
    onSubmit({
      type: QuestionType.TextInput,
      ...values,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your question"
                  {...field}
                  data-testid="question"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Answser"
                  {...field}
                  data-testid="answer"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="default"
          type="submit"
          data-testid="choice-based-submit-button"
        >
          {isEditMode ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};
