"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { QuestionTypePicker } from "./QuestionTypePicker";
import { CreateQuestionForm, EditQuestionForm } from "./QuestionForm";
import { QuestionType, TestQuestionModel } from "../types";
import { useState } from "react";

export enum DialogMode {
  Create = "create",
  Edit = "edit",
}

type DialogCommonContext = {
  isOpen: boolean;
};

type DialogCreateContext = DialogCommonContext & {
  mode: DialogMode.Create;
};

type DialogEditContext = DialogCommonContext & {
  mode: DialogMode.Edit;
  question: TestQuestionModel;
};

export type DialogContext = DialogCreateContext | DialogEditContext;

export interface QuestionDialogProps {
  context: DialogContext;
  onClose: () => void;
  onQuestionFormSubmit: (question: TestQuestionModel) => void;
}

export const QuestionDialog = (props: QuestionDialogProps) => {
  const [questionType, setQuestionType] = useState<QuestionType>(
    props.context.mode === DialogMode.Create
      ? QuestionType.SingleChoice
      : props.context.question.type
  );

  const title =
    props.context.mode === "create" ? "Add question" : "Edit question";

  const description =
    props.context.mode === "create"
      ? "Add a new question to the test"
      : "Edit the question";

  return (
    <Dialog defaultOpen={true} onOpenChange={props.onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <QuestionTypePicker
            value={questionType}
            disabled={props.context.mode === DialogMode.Edit}
            onChange={setQuestionType}
          />
          {props.context.mode === DialogMode.Edit ? (
            <EditQuestionForm
              question={props.context.question}
              onSubmit={props.onQuestionFormSubmit}
            />
          ) : (
            <CreateQuestionForm
              type={questionType}
              onSubmit={props.onQuestionFormSubmit}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
