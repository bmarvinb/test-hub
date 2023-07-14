"use client";

import { QuestionType } from "@/shared/models/test-model";
import {
  ChoiceBasedQuestion,
  NumberInputQuestion,
  TestQuestionModel,
  TextInputQuestion,
} from "../models/test-editor-model";
import { ChoiceBasedQuestionForm } from "./questions/ChoiceBasedQuestionForm";
import { NumberBasedQuestionForm } from "./questions/NumberBasedQuestionForm";
import { TextBasedQuestionForm } from "./questions/TextBasedQuestionForm";

export type InitialData =
  | {
      type: QuestionType.SingleChoice | QuestionType.MultipleChoice;
      question?: ChoiceBasedQuestion;
    }
  | {
      type: QuestionType.NumberInput;
      question?: NumberInputQuestion;
    }
  | {
      type: QuestionType.TextInput;
      question?: TextInputQuestion;
    };

export interface CreateQuestionFormProps {
  initialData: InitialData;
  onSubmit: (data: TestQuestionModel) => void;
}

export const CreateQuestionForm = ({
  initialData,
  onSubmit,
}: CreateQuestionFormProps) => {
  switch (initialData?.type) {
    case QuestionType.SingleChoice:
      return (
        <ChoiceBasedQuestionForm
          initialData={initialData.question}
          singleChoice={true}
          onSubmit={onSubmit}
        />
      );
    case QuestionType.MultipleChoice:
      return (
        <ChoiceBasedQuestionForm
          initialData={initialData.question}
          singleChoice={false}
          onSubmit={onSubmit}
        />
      );
    case QuestionType.NumberInput:
      return (
        <NumberBasedQuestionForm
          initialData={initialData.question}
          onSubmit={onSubmit}
        />
      );
    case QuestionType.TextInput:
      return (
        <TextBasedQuestionForm
          initialData={initialData.question}
          onSubmit={onSubmit}
        />
      );
    default:
      return null;
  }
};
