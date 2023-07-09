"use client";

import {
  SingleChoiceQuestion,
  SingleChoiceQuestionForm,
} from "@/app/new/components/SingleChoiceQuestionForm";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useState } from "react";
import * as z from "zod";
import { QuestionType } from "../types";

export interface QuestionEditorProps {
  onSubmit: (data: TestQuestionModel) => void;
}

export type TestQuestionModel = z.infer<typeof TestQuestion>;

const MultipleChoiceQuestion = z.object({
  id: z.string(),
  type: z.literal(QuestionType.MultipleChoice),
  options: z.array(z.string()),
  answer: z.array(z.string()),
});

const NumberInputQuestion = z.object({
  id: z.string(),
  type: z.literal(QuestionType.NumberInput),
  answer: z.number(),
  tolerance: z.number(),
});

const TextInputQuestion = z.object({
  id: z.string(),
  type: z.literal(QuestionType.TextInput),
  answer: z.union([z.string(), z.array(z.string())]),
});

export const TestQuestion = z.union([
  SingleChoiceQuestion,
  MultipleChoiceQuestion,
  NumberInputQuestion,
  TextInputQuestion,
]);

const FormContent = (props: {
  type: QuestionType;
  onSubmit: (data: TestQuestionModel) => void;
}) => {
  switch (props.type) {
    case QuestionType.SingleChoice:
      return <SingleChoiceQuestionForm onSubmit={props.onSubmit} />;
    case QuestionType.MultipleChoice:
      return <div>Multiple choice form</div>;
    case QuestionType.NumberInput:
      return <div>Number input form</div>;
    case QuestionType.TextInput:
      return <div>Text input form</div>;
    default:
      return null;
  }
};

export const QuestionEditor = (props: QuestionEditorProps) => {
  const [questionType, setQuestionType] = useState<QuestionType>(
    QuestionType.SingleChoice
  );

  return (
    <>
      <FormItem>
        <FormLabel>Question type</FormLabel>
        <FormControl>
          <Select
            onValueChange={(value) => setQuestionType(value as QuestionType)}
            defaultValue={questionType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select question type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={QuestionType.SingleChoice}>
                Single choice
              </SelectItem>
              <SelectItem value={QuestionType.MultipleChoice}>
                Multiple choice
              </SelectItem>
              <SelectItem value={QuestionType.NumberInput}>
                Number input
              </SelectItem>
              <SelectItem value={QuestionType.TextInput}>Text input</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormContent type={questionType} onSubmit={props.onSubmit} />
    </>
  );
};
