import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { QuestionType } from "@/shared/dtos/test-dto";

export interface QuestionTypePickerProps {
  options: [QuestionType, string][];
  value: QuestionType;
  disabled: boolean;
  onChange: (value: QuestionType) => void;
}

export const QuestionTypePicker = ({
  options,
  value,
  disabled,
  onChange: setQuestionType,
}: QuestionTypePickerProps) => {
  return (
    <>
      <Label>Question type</Label>
      <Select
        defaultValue={value}
        disabled={disabled}
        onValueChange={(value) => setQuestionType(value as QuestionType)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select question type" />
        </SelectTrigger>

        <SelectContent>
          {options.map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
