"use client";

import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { useToast } from "@/lib/hooks/use-toast";
import { useState } from "react";
import { TestEditorModel, TestQuestionModel } from "../types";
import { QuestionDialogContext, QuestionDialog } from "./QuestionDialog";
import { QuestionsList } from "./QuestionsList";
import { TEST_FORM_ID, TestForm, TestFormModel } from "./TestForm";
import { Mode } from "@/lib/form";

type TestEditorCreateMode = {
  mode: Mode.Create;
};

type TestEditorEditMode = {
  mode: Mode.Edit;
  test: TestEditorModel;
};

export type TestEditorMode = TestEditorCreateMode | TestEditorEditMode;

export interface TestEditorProps {
  mode?: TestEditorMode;
  onSubmit: (test: TestEditorModel) => void;
}

function isEditMode(context: TestEditorMode): context is TestEditorEditMode {
  return context.mode === Mode.Edit;
}

export const TestEditor = ({
  mode = { mode: Mode.Create },
  onSubmit,
}: TestEditorProps) => {
  const toast = useToast();
  const [questions, setQuestions] = useState<TestQuestionModel[]>(
    isEditMode(mode) ? mode.test.questions : []
  );
  const [questionDialogContext, setQuestionDialogContext] =
    useState<QuestionDialogContext | null>();

  const handleTestEditorFormSubmit = (data: TestFormModel) => {
    if (!questions.length) {
      return toast.toast({
        variant: "destructive",
        title: "Invalid form",
        description: "Please add at least one question to the test",
      });
    }
    onSubmit({ ...data, questions });
    toast.toast({
      title: "Test created",
      description: "You can start sharing your test now",
    });
  };

  const handleQuestionFormSubmit = (question: TestQuestionModel) => {
    setQuestions((prev) => [...prev, question]);
    setQuestionDialogContext(null);
    toast.toast({
      title: "Question added",
      description: "Your question has been added to the test",
    });
  };

  const handleQuestionEdit = (question: TestQuestionModel) => {
    setQuestionDialogContext({
      mode: Mode.Edit,
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
        <TestForm
          data={
            isEditMode(mode)
              ? { mode: Mode.Edit, test: mode.test }
              : { mode: Mode.Create }
          }
          onSubmit={handleTestEditorFormSubmit}
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <Label>Questions</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setQuestionDialogContext({ mode: Mode.Create })}
        >
          Add question
        </Button>

        {questionDialogContext && (
          <QuestionDialog
            context={questionDialogContext}
            onClose={() => setQuestionDialogContext(null)}
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
        {isEditMode(mode) ? "Update" : "Create"}
      </Button>
    </>
  );
};
