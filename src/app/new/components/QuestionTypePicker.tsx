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
  disabled: boolean;
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
  disabled,
  onChange: setQuestionType,
}: QuestionTypePickerProps) => {
  return (
    <>
      <Label>Question type</Label>
      <Select
        defaultValue={questionType}
        disabled={disabled}
        onValueChange={(value) => setQuestionType(value as QuestionType)}
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
