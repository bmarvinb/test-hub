"use client";

import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { useToast } from "@/lib/hooks/use-toast";
import { useState } from "react";
import { QuestionType } from "../types";
import { DialogContext, QuestionDialog } from "./QuestionDialog";
import { QuestionForm, TestQuestionModel } from "./QuestionForm";
import { QuestionTypePicker } from "./QuestionTypePicker";
import { QuestionsList } from "./QuestionsList";
import { TEST_FORM_ID, TestForm, TestFormModel } from "./TestForm";

type TestQuestions = {
  questions: TestQuestionModel[];
};

export type TestEditorModel = TestFormModel & TestQuestions;

export interface TestEditorProps {
  data: TestEditorModel;
  onSubmit: (data: TestEditorModel) => void;
}

export const TestEditor = (props: TestEditorProps) => {
  const toast = useToast();
  const { title, description } = props.data;
  const [questions, setQuestions] = useState<TestQuestionModel[]>(
    props.data.questions
  );
  const [questionType, setQuestionType] = useState<QuestionType>(
    QuestionType.SingleChoice
  );
  const [dialogContext, setDialogContext] = useState<DialogContext | null>(
    null
  );

  const onTestEditorFormSubmit = (data: TestFormModel) => {
    props.onSubmit({ ...data, questions });
  };

  const onQuestionFormSubmit = (question: TestQuestionModel) => {
    setQuestions((prev) => [...prev, question]);
    setDialogContext(null);
    toast.toast({
      title: "Question added",
      description: "Your question has been added to the test",
    });
  };

  return (
    <>
      <div className="mb-6">
        <TestForm
          title={title}
          description={description}
          onSubmit={onTestEditorFormSubmit}
        />
      </div>

      <div className="flex justify-between items-center">
        <Label>Questions</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            setDialogContext({
              isOpen: true,
              mode: "create",
            })
          }
        >
          Add question
        </Button>

        {dialogContext && (
          <QuestionDialog
            context={dialogContext}
            onClose={() => setDialogContext(null)}
          >
            <QuestionTypePicker
              value={questionType}
              onChange={setQuestionType}
            />
            <QuestionForm type={questionType} onSubmit={onQuestionFormSubmit} />
          </QuestionDialog>
        )}
      </div>

      <div className="mb-8">
        <QuestionsList questions={questions} />
      </div>

      <Button type="submit" form={TEST_FORM_ID}>
        {props.data.title ? "Update" : "Create"}
      </Button>
    </>
  );
};
