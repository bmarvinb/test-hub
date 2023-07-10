"use client";

import {
  SingleChoiceQuestion,
  SingleChoiceQuestionForm,
} from "@/app/new/components/SingleChoiceQuestionForm";
import { FormMode } from "@/lib/form";
import * as z from "zod";
import { QuestionType } from "../types";

export interface QuestionEditorProps {
  questionType: QuestionType;
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

export interface CreateQuestionFormProps {
  type: QuestionType;
  onSubmit: (data: TestQuestionModel) => void;
}

export const CreateQuestionForm = ({
  type,
  onSubmit,
}: CreateQuestionFormProps) => {
  const props = { data: { mode: FormMode.Create } as const, onSubmit };
  switch (type) {
    case QuestionType.SingleChoice:
      return <SingleChoiceQuestionForm {...props} />;
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

export interface EditQuestionFormProps {
  question: TestQuestionModel;
  onSubmit: (data: TestQuestionModel) => void;
}

export const EditQuestionForm = ({
  question,
  onSubmit,
}: EditQuestionFormProps) => {
  switch (question.type) {
    case QuestionType.SingleChoice:
      return (
        <SingleChoiceQuestionForm
          data={{ mode: FormMode.Edit, question: question }}
          onSubmit={onSubmit}
        />
      );
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
