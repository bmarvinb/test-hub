"use client";

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
import { Mode } from "@/lib/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { NumberInputQuestion } from "../types";
import { Input } from "@/components/ui/Input";
import { QuestionType } from "@/shared/models/test";
import { Textarea } from "@/components/ui/Textarea";

type CreateFormData = {
  mode: Mode.Create;
};

type EditFormData = {
  mode: Mode.Edit;
  answer: number;
  tolerance: number;
};

export type FormData = CreateFormData | EditFormData;

export interface NumberBasedQuestionFormProps {
  data: FormData;
  onSubmit: (data: NumberInputQuestion) => void;
}

function isEditMode(context: FormData): context is EditFormData {
  return context.mode === Mode.Edit;
}

const NumberBasedQuestionSchema = z.object({
  question: z.string().min(1, "Question cannot be empty"),
  answer: z.number(),
  tolerance: z.number().max(1).min(0),
});

export const NumberBasedQuestionForm = ({
  data,
  onSubmit,
}: NumberBasedQuestionFormProps) => {
  const defaultValues = isEditMode(data)
    ? {
        answer: data.answer,
        tolerance: data.tolerance,
      }
    : {
        tolerance: 0,
      };

  const form = useForm<z.infer<typeof NumberBasedQuestionSchema>>({
    resolver: zodResolver(NumberBasedQuestionSchema),
    defaultValues,
  });

  const handleSubmit = (values: z.infer<typeof NumberBasedQuestionSchema>) => {
    onSubmit({
      type: QuestionType.NumberInput,
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
                <Input
                  type="number"
                  placeholder="Answer"
                  {...field}
                  data-testid="answer"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tolerance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tolerance</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step={0.01}
                  min={0}
                  max={1}
                  placeholder="Tolerance"
                  {...field}
                  data-testid="tolerance"
                />
              </FormControl>
              <FormDescription>From 0 to 1</FormDescription>
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
