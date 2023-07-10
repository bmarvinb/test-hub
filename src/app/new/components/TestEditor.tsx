"use client";

import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { useToast } from "@/lib/hooks/use-toast";
import { useState } from "react";
import { TestQuestionModel } from "../types";
import { DialogContext, DialogMode, QuestionDialog } from "./QuestionDialog";
import { QuestionsList } from "./QuestionsList";
import { TEST_FORM_ID, TestForm, TestFormModel } from "./TestForm";

type TestQuestions = {
  questions: TestQuestionModel[];
};

export type TestEditorModel = TestFormModel & TestQuestions;

export interface TestEditorProps {
  data?: TestEditorModel;
  onSubmit: (data: TestEditorModel) => void;
}

export const TestEditor = (props: TestEditorProps) => {
  const toast = useToast();
  const [questions, setQuestions] = useState<TestQuestionModel[]>(
    props.data?.questions ?? []
  );
  const [dialogContext, setDialogContext] = useState<DialogContext | null>(
    null
  );

  const handleTestEditorFormSubmit = (data: TestFormModel) => {
    if (questions.length === 0) {
      return toast.toast({
        variant: "destructive",
        title: "Invalid form",
        description: "Please add at least one question to the test",
      });
    }
    props.onSubmit({ ...data, questions });
    toast.toast({
      variant: "default",
      title: "Test created",
      description: "You can start sharing your test now",
    });
  };

  const handleQuestionFormSubmit = (question: TestQuestionModel) => {
    setQuestions((prev) => [...prev, question]);
    setDialogContext(null);
    toast.toast({
      title: "Question added",
      description: "Your question has been added to the test",
    });
  };

  const handleQuestionEdit = (question: TestQuestionModel) => {
    setDialogContext({
      isOpen: true,
      mode: DialogMode.Edit,
      question,
    });
  };

  const handleQuestionDelete = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
    toast.toast({
      title: "Question deleted",
      description: "Your question has been deleted from the test",
    });
  };

  return (
    <>
      <div className="mb-6">
        <TestForm data={props.data} onSubmit={handleTestEditorFormSubmit} />
      </div>

      <div className="flex justify-between items-center mb-4">
        <Label>Questions</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            setDialogContext({
              isOpen: true,
              mode: DialogMode.Create,
            })
          }
        >
          Add question
        </Button>

        {dialogContext && (
          <QuestionDialog
            context={dialogContext}
            onClose={() => setDialogContext(null)}
            onQuestionFormSubmit={handleQuestionFormSubmit}
          ></QuestionDialog>
        )}
      </div>

      <div className="mb-8">
        <QuestionsList
          questions={questions}
          onEditQuestion={handleQuestionEdit}
          onDeleteQuestion={handleQuestionDelete}
        />
      </div>

      <Button type="submit" form={TEST_FORM_ID}>
        {props.data?.title ? "Update" : "Create"}
      </Button>
    </>
  );
};
