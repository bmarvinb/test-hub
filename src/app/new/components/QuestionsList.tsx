import { QuestionType } from "../types";
import { TestQuestionModel } from "./QuestionEditor";

const QuestionListItem = (props: {
  question: TestQuestionModel;
  order: number;
}) => {
  const { question, order } = props;
  switch (question.type) {
    case QuestionType.SingleChoice:
      return (
        <div className="text-sm">
          <span className="text-gray-500">{order}. </span>
          {question.question}
        </div>
      );
    case QuestionType.MultipleChoice:
      return <div>Multiple choise</div>;
    case QuestionType.NumberInput:
      return <div>Number input</div>;
    case QuestionType.TextInput:
      return <div>Text input</div>;
    default:
      return null;
  }
};

export const QuestionsList = (props: { questions: TestQuestionModel[] }) => {
  const { questions } = props;
  return questions.length === 0 ? (
    <div className="text-gray-500 text-sm">No questions</div>
  ) : (
    questions.map((question, index) => (
      <QuestionListItem key={index} question={question} order={index + 1} />
    ))
  );
};
