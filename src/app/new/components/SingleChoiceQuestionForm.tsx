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
import { Input } from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { QuestionType } from "../types";

export type SingleChoiceQuestionModel = z.infer<typeof SingleChoiceQuestion>;

const SingleChoiceQuestion = z.object({
  id: z.string(),
  type: z.literal(QuestionType.SingleChoice),
  options: z.array(z.string()),
  answer: z.string(),
});

export const SingleChoiceQuestionForm = () => {
  console.log("render single choise form");

  const id = useId();
  const form = useForm<SingleChoiceQuestionModel>({
    resolver: zodResolver(SingleChoiceQuestion),
    defaultValues: {
      id,
      options: [],
      answer: "",
    },
  });

  const onSubmit = (values: SingleChoiceQuestionModel) => {
    console.log("values", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Input placeholder="Answer to the question" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};
