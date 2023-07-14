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
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Mode } from "@/lib/form";
import { QuestionType } from "@/shared/models/test-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { NumberInputQuestion } from "../../models/test-editor-model";

type CreateFormData = {
  mode: Mode.Create;
};

type EditFormData = {
  mode: Mode.Edit;
  question: string;
  answer: number;
  tolerance: number;
};

export type FormData = CreateFormData | EditFormData;

export interface NumberBasedQuestionFormProps {
  data?: FormData;
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
  data = { mode: Mode.Create },
  onSubmit,
}: NumberBasedQuestionFormProps) => {
  const defaultValues = isEditMode(data)
    ? {
        question: data.question,
        answer: data.answer,
        tolerance: data.tolerance,
      }
    : {
        answer: 0,
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
                  onChange={(e) => {
                    field.onChange(e.target.valueAsNumber);
                  }}
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
                  data-testid="tolerance"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.valueAsNumber);
                  }}
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
