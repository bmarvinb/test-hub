"use client";

import { Title } from "@/components/ui/Title";
import { TestEditor, TestEditorModel } from "./components/TestEditor";
import { QuestionType } from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const newTest: TestEditorModel = {
  title: "",
  description: "",
  questions: [],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const editTest: TestEditorModel = {
  title: "Test title",
  description: "Test description",
  questions: [
    {
      type: QuestionType.SingleChoice,
      question: "Question 1",
      options: [
        { isAnswer: true, value: "Option 1" },
        { isAnswer: false, value: "Option 2" },
        { isAnswer: false, value: "Option 3" },
      ],
    },
  ],
};

export default function NewTest() {
  const data = newTest;
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <Title className="mb-8">
        {data.title ? "Update test" : "Create test"}
      </Title>

      <TestEditor onSubmit={(data) => console.log("Data to send", data)} />
    </div>
  );
}
