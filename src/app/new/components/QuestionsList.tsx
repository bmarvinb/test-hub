import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { QuestionType, TestQuestionModel } from "../types";
import { Edit } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  question: TestQuestionModel;
  order: number;
  onEditQuestion: (question: TestQuestionModel) => void;
}

const QuestionListItem = (props: QuestionListItemProps) => {
  const { question, order } = props;
  switch (question.type) {
    case QuestionType.SingleChoice:
    case QuestionType.MultipleChoice:
      return (
        <div className={cn("text-sm flex gap-2", props.className)}>
          <div>
            <span className="text-gray-500">{order}. </span>
            {question.question}
          </div>
          <Tooltip>
            <TooltipTrigger
              type="button"
              onClick={() => props.onEditQuestion(question)}
            >
              <Edit size={16} className="text-gray-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit question</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    case QuestionType.NumberInput:
      return <div>Number input</div>;
    case QuestionType.TextInput:
      return <div>Text input</div>;
    default:
      return null;
  }
};

export interface QuestionsListProps {
  questions: TestQuestionModel[];
  onEditQuestion: (question: TestQuestionModel) => void;
}

export const QuestionsList = (props: QuestionsListProps) => {
  const { questions } = props;
  return questions.length === 0 ? (
    <div className="text-gray-500 text-sm">No questions</div>
  ) : (
    questions.map((question, index) => (
      <QuestionListItem
        className="mb-2"
        key={index}
        question={question}
        order={index + 1}
        onEditQuestion={props.onEditQuestion}
      />
    ))
  );
};
