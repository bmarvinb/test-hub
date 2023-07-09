import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { QuestionType } from "../types";

export interface QuestionTypePickerProps {
  value: QuestionType;
  onChange: (value: QuestionType) => void;
}

const questionTypes: [QuestionType, string][] = [
  [QuestionType.SingleChoice, "Single choice"],
  [QuestionType.MultipleChoice, "Multiple choice"],
  [QuestionType.NumberInput, "Number input"],
  [QuestionType.TextInput, "Text input"],
];

export const QuestionTypePicker = ({
  value: questionType,
  onChange: setQuestionType,
}: QuestionTypePickerProps) => {
  return (
    <>
      <Label>Question type</Label>
      <Select
        onValueChange={(value) => setQuestionType(value as QuestionType)}
        defaultValue={questionType}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select question type" />
        </SelectTrigger>

        <SelectContent>
          {questionTypes.map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
