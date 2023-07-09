"use client";

import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { useState } from "react";
import { QuestionType } from "../types";
import { QuestionDialog } from "./QuestionDialog";
import { QuestionForm, TestQuestionModel } from "./QuestionForm";
import { QuestionTypePicker } from "./QuestionTypePicker";
import { QuestionsList } from "./QuestionsList";
import { TestEditorGeneralModel, TEST_FORM_ID, TestForm } from "./TestForm";

export type TestEditorModel = TestEditorGeneralModel & {
  questions: TestQuestionModel[];
};

export interface TestEditorProps {
  data: TestEditorModel;
  onSubmit: (data: TestEditorModel) => void;
}

export const TestEditor = (props: TestEditorProps) => {
  const { title, description } = props.data;
  const [questions, setQuestions] = useState<TestQuestionModel[]>(
    props.data.questions
  );
  const [questionType, setQuestionType] = useState<QuestionType>(
    QuestionType.SingleChoice
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onTestEditorFormSubmit = (data: TestEditorGeneralModel) => {
    props.onSubmit({ ...data, questions });
  };

  const onQuestionFormSubmit = (question: TestQuestionModel) => {
    setIsDialogOpen(false);
    setQuestions((prev) => [...prev, question]);
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
          onClick={() => setIsDialogOpen(true)}
        >
          Add question
        </Button>

        <QuestionDialog isOpen={isDialogOpen} toggleIsOpen={setIsDialogOpen}>
          <QuestionTypePicker value={questionType} onChange={setQuestionType} />
          <QuestionForm type={questionType} onSubmit={onQuestionFormSubmit} />
        </QuestionDialog>
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
