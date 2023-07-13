import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { TestQuestionModel } from "../types";
import { QuestionType } from "@/shared/models/test";

export interface QuestionsListProps {
  questions: TestQuestionModel[];
  onEditQuestion: (question: TestQuestionModel) => void;
  onDeleteQuestion: (index: number) => void;
}

function questionTitle(question: TestQuestionModel) {
  switch (question.type) {
    case QuestionType.SingleChoice:
    case QuestionType.MultipleChoice:
      return question.question;
    case QuestionType.NumberInput:
      return "Number input";
    case QuestionType.TextInput:
      return "Text input";
    default:
      return null;
  }
}

function questionType(question: TestQuestionModel) {
  switch (question.type) {
    case QuestionType.SingleChoice:
      return "Single choice";
    case QuestionType.MultipleChoice:
      return "Multiple choice";
    case QuestionType.NumberInput:
      return "Number input";
    case QuestionType.TextInput:
      return "Text input";
    default:
      return null;
  }
}

export const QuestionsList = (props: QuestionsListProps) => {
  const { questions } = props;

  if (questions.length === 0) {
    return <div className="text-sm text-gray-600">No added questions</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions.map((question, index) => (
          <TableRow key={index}>
            <TableCell>{questionTitle(question)}</TableCell>
            <TableCell>{questionType(question)}</TableCell>
            <TableCell className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => props.onEditQuestion(question)}
              >
                Edit
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => props.onDeleteQuestion(index)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
