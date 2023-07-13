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
import { Mode } from "@/lib/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TextInputQuestion } from "../types";
import { QuestionType } from "@/shared/models/test";
import { Textarea } from "@/components/ui/Textarea";

type CreateFormData = {
  mode: Mode.Create;
};

type EditFormData = {
  mode: Mode.Edit;
  question: string;
  answer: string;
};

export type FormData = CreateFormData | EditFormData;

export interface TextBasedQuestionFormProps {
  data?: FormData;
  onSubmit: (data: TextInputQuestion) => void;
}

function isEditMode(context: FormData): context is EditFormData {
  return context.mode === Mode.Edit;
}

const TextBasedQuestionSchema = z.object({
  question: z.string().min(1, "Question cannot be empty"),
  answer: z.string().min(1, "Answer cannot be empty"),
});

export const TextBasedQuestionForm = ({
  data = { mode: Mode.Create },
  onSubmit,
}: TextBasedQuestionFormProps) => {
  const defaultValues = isEditMode(data)
    ? {
        question: data.question,
        answer: data.answer,
      }
    : {
        tolerance: 0,
      };

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
          {isEditMode(data) ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};
