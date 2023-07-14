"use client";

import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { useToast } from "@/lib/hooks/use-toast";
import { useState } from "react";
import {
  TestEditorModel,
  TestQuestionModel,
} from "../models/test-editor-model";
import { QuestionDialog } from "./QuestionDialog";
import { QuestionsList } from "./QuestionsList";
import { TEST_FORM_ID, TestForm, TestFormModel } from "./TestForm";

export interface TestEditorProps {
  initialData?: TestEditorModel;
  isLoading?: boolean;
  isError?: boolean;
  onSubmit: (test: TestEditorModel) => void;
}

export const TestEditor = ({
  initialData,
  isLoading,
  onSubmit,
}: TestEditorProps) => {
  const isEditMode = initialData !== undefined;
  const toast = useToast();
  const [questions, setQuestions] = useState<TestQuestionModel[]>(
    isEditMode ? initialData.questions : []
  );
  const [questionDialogContext, setQuestionDialogContext] = useState<{
    isOpen: boolean;
    question?: TestQuestionModel;
  }>({
    isOpen: false,
    question: undefined,
  });

  const closeDialog = () => {
    setQuestionDialogContext({
      isOpen: false,
    });
  };

  const openDialog = (question?: TestQuestionModel) => {
    setQuestionDialogContext({
      isOpen: true,
      question,
    });
  };

  const handleTestEditorFormSubmit = (data: TestFormModel) => {
    if (!questions.length) {
      return toast.toast({
        variant: "destructive",
        title: "Invalid form",
        description: "Please add at least one question to the test",
      });
    }
    onSubmit({ ...data, questions });
  };

  const handleQuestionFormSubmit = (question: TestQuestionModel) => {
    setQuestions((prev) => [...prev, question]);
    closeDialog();
    toast.toast({
      title: "Question added",
      description: "Your question has been added to the test",
    });
  };

  const handleQuestionEdit = (question: TestQuestionModel) => {
    openDialog(question);
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
          initialData={initialData}
          onSubmit={handleTestEditorFormSubmit}
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <Label>Questions</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => openDialog()}
        >
          Add question
        </Button>

        {questionDialogContext.isOpen && (
          <QuestionDialog
            question={questionDialogContext.question}
            onClose={closeDialog}
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

      <Button type="submit" form={TEST_FORM_ID} disabled={isLoading}>
        {isEditMode ? "Update" : "Create"}
      </Button>
    </>
  );
};
