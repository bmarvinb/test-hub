"use client";

import { FormMode } from "@/lib/form";
import { QuestionType, TestQuestionModel } from "../types";
import { ChoiceBasedQuestionForm } from "./ChoiceBasedQuestionForm";

export interface QuestionEditorProps {
  questionType: QuestionType;
  onSubmit: (data: TestQuestionModel) => void;
}

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
          data={{ mode: FormMode.Create, singleChoice: true }}
          onSubmit={onSubmit}
        />
      );
    case QuestionType.MultipleChoice:
      return (
        <ChoiceBasedQuestionForm
          data={{ mode: FormMode.Create, singleChoice: false }}
          onSubmit={onSubmit}
        />
      );
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
        <ChoiceBasedQuestionForm
          data={{ mode: FormMode.Edit, question, singleChoice: true }}
          onSubmit={onSubmit}
        />
      );
    case QuestionType.MultipleChoice:
      return (
        <ChoiceBasedQuestionForm
          data={{
            mode: FormMode.Edit,
            question,
            singleChoice: false,
          }}
          onSubmit={onSubmit}
        />
      );
    case QuestionType.NumberInput:
      return <div>Number input form</div>;
    case QuestionType.TextInput:
      return <div>Text input form</div>;
    default:
      return null;
  }
};
