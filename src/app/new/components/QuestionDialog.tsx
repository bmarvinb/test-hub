"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { useState } from "react";
import {
  ChoiceBasedQuestion,
  NumberInputQuestion,
  TestQuestionModel,
  TextInputQuestion,
} from "../models/test-editor-model";
import { CreateQuestionForm, QuestionFormContext } from "./QuestionForm";
import { QuestionTypePicker } from "./QuestionTypePicker";
import { QuestionType } from "@/shared/models/test-model";

function getQuestionFormContext(
  type: QuestionType,
  question?: TestQuestionModel
): QuestionFormContext {
  switch (type) {
    case QuestionType.SingleChoice:
    case QuestionType.MultipleChoice:
      return {
        type,
        initialData: question ? (question as ChoiceBasedQuestion) : undefined,
      };
    case QuestionType.NumberInput:
      return {
        type,
        initialData: question ? (question as NumberInputQuestion) : undefined,
      };
    case QuestionType.TextInput:
      return {
        type,
        initialData: question ? (question as TextInputQuestion) : undefined,
      };
  }
}

export interface QuestionDialogProps {
  question?: TestQuestionModel;
  onClose: () => void;
  onQuestionFormSubmit: (question: TestQuestionModel) => void;
}

export const QuestionDialog = ({
  question,
  onClose,
  onQuestionFormSubmit,
}: QuestionDialogProps) => {
  const isEditMode = question !== undefined;
  const [questionType, setQuestionType] = useState<QuestionType>(
    isEditMode ? question.type : QuestionType.SingleChoice
  );

  const questionTypes: [QuestionType, string][] = [
    [QuestionType.SingleChoice, "Single choice"],
    [QuestionType.MultipleChoice, "Multiple choice"],
    [QuestionType.NumberInput, "Number input"],
    [QuestionType.TextInput, "Text input"],
  ];

  const title = isEditMode ? "Edit question" : "Add question";

  const description = isEditMode
    ? "Edit the question"
    : "Add a new question to the test";

  return (
    <Dialog defaultOpen={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <QuestionTypePicker
            options={questionTypes}
            value={questionType}
            disabled={isEditMode}
            onChange={setQuestionType}
          />
          <CreateQuestionForm
            context={getQuestionFormContext(questionType, question)}
            onSubmit={onQuestionFormSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
