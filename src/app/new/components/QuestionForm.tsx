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

export type QuestionFormContext =
  | {
      type: QuestionType.SingleChoice | QuestionType.MultipleChoice;
      initialData?: ChoiceBasedQuestion;
    }
  | {
      type: QuestionType.NumberInput;
      initialData?: NumberInputQuestion;
    }
  | {
      type: QuestionType.TextInput;
      initialData?: TextInputQuestion;
    };

export interface CreateQuestionFormProps {
  context: QuestionFormContext;
  onSubmit: (data: TestQuestionModel) => void;
}

export const CreateQuestionForm = ({
  context,
  onSubmit,
}: CreateQuestionFormProps) => {
  switch (context.type) {
    case QuestionType.SingleChoice:
      return (
        <ChoiceBasedQuestionForm
          initialData={context.initialData}
          singleChoice={true}
          onSubmit={onSubmit}
        />
      );
    case QuestionType.MultipleChoice:
      return (
        <ChoiceBasedQuestionForm
          initialData={context.initialData}
          singleChoice={false}
          onSubmit={onSubmit}
        />
      );
    case QuestionType.NumberInput:
      return (
        <NumberBasedQuestionForm
          initialData={context.initialData}
          onSubmit={onSubmit}
        />
      );
    case QuestionType.TextInput:
      return (
        <TextBasedQuestionForm
          initialData={context.initialData}
          onSubmit={onSubmit}
        />
      );
    default:
      return null;
  }
};
