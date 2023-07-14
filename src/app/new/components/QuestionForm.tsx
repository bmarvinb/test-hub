"use client";

import { Mode } from "@/lib/form";
import { QuestionType } from "@/shared/models/test-model";
import { TestQuestionModel } from "../models/test-editor-model";
import { ChoiceBasedQuestionForm } from "./questions/ChoiceBasedQuestionForm";
import { NumberBasedQuestionForm } from "./questions/NumberBasedQuestionForm";
import { TextBasedQuestionForm } from "./questions/TextBasedQuestionForm";

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
      return <NumberBasedQuestionForm onSubmit={onSubmit} />;
    case QuestionType.TextInput:
      return <TextBasedQuestionForm onSubmit={onSubmit} />;
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
            question: question.question,
            answer: question.answer,
            tolerance: question.tolerance,
          }}
          onSubmit={onSubmit}
        />
      );
    case QuestionType.TextInput:
      return (
        <TextBasedQuestionForm
          data={{
            mode: Mode.Edit,
            question: question.question,
            answer: question.answer,
          }}
          onSubmit={onSubmit}
        />
      );
    default:
      return null;
  }
};
