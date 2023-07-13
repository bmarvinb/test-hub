"use client";

import { Mode } from "@/lib/form";
import { QuestionType } from "@/shared/models/test";
import { TestQuestionModel } from "../types";
import { ChoiceBasedQuestionForm } from "./ChoiceBasedQuestionForm";
import { NumberBasedQuestionForm } from "./NumberBasedQuestionForm";

export interface CreateQuestionFormProps {
  type: QuestionType;
  onSubmit: (data: TestQuestionModel) => void;
}

export const CreateQuestionForm = ({
  type,
  onSubmit,
}: CreateQuestionFormProps) => {
  switch (type) {
    case QuestionType.SingleChoice:
      return (
        <ChoiceBasedQuestionForm
          data={{ mode: Mode.Create, singleChoice: true }}
          onSubmit={onSubmit}
        />
      );
    case QuestionType.MultipleChoice:
      return (
        <ChoiceBasedQuestionForm
          data={{ mode: Mode.Create, singleChoice: false }}
          onSubmit={onSubmit}
        />
      );
    case QuestionType.NumberInput:
      return (
        <NumberBasedQuestionForm
          data={{ mode: Mode.Create }}
          onSubmit={onSubmit}
        />
      );
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
        <ChoiceBasedQuestionForm
          data={{ mode: Mode.Edit, question, singleChoice: true }}
          onSubmit={onSubmit}
        />
      );
    case QuestionType.MultipleChoice:
      return (
        <ChoiceBasedQuestionForm
          data={{
            mode: Mode.Edit,
            question,
            singleChoice: false,
          }}
          onSubmit={onSubmit}
        />
      );
    case QuestionType.NumberInput:
      return (
        <NumberBasedQuestionForm
          data={{
            mode: Mode.Edit,
            answer: question.answer,
            tolerance: question.tolerance,
          }}
          onSubmit={onSubmit}
        />
      );
    case QuestionType.TextInput:
      return <div>Text input form</div>;
    default:
      return null;
  }
};
