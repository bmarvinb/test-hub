"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Mode } from "@/lib/form";
import { useState } from "react";
import { TestQuestionModel } from "../types";
import { CreateQuestionForm, EditQuestionForm } from "./QuestionForm";
import { QuestionTypePicker } from "./QuestionTypePicker";
import { QuestionType } from "@/shared/dtos/test-dto";

type QuestionDialogCreateContext = {
  mode: Mode.Create;
};

type QuestionDialogEditContext = {
  mode: Mode.Edit;
  question: TestQuestionModel;
};

export type QuestionDialogContext =
  | QuestionDialogCreateContext
  | QuestionDialogEditContext;

export interface QuestionDialogProps {
  context: QuestionDialogContext;
  onClose: () => void;
  onQuestionFormSubmit: (question: TestQuestionModel) => void;
}

function isEditMode(
  context: QuestionDialogContext
): context is QuestionDialogEditContext {
  return context.mode === Mode.Edit;
}

export const QuestionDialog = ({
  context,
  onClose,
  onQuestionFormSubmit,
}: QuestionDialogProps) => {
  const editMode = isEditMode(context);
  const [questionType, setQuestionType] = useState<QuestionType>(
    editMode ? context.question.type : QuestionType.SingleChoice
  );

  const questionTypes: [QuestionType, string][] = [
    [QuestionType.SingleChoice, "Single choice"],
    [QuestionType.MultipleChoice, "Multiple choice"],
    [QuestionType.NumberInput, "Number input"],
    [QuestionType.TextInput, "Text input"],
  ];

  const title = editMode ? "Edit question" : "Add question";

  const description = editMode
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
            disabled={editMode}
            onChange={setQuestionType}
          />
          {editMode ? (
            <EditQuestionForm
              question={context.question}
              onSubmit={onQuestionFormSubmit}
            />
          ) : (
            <CreateQuestionForm
              type={questionType}
              onSubmit={onQuestionFormSubmit}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
