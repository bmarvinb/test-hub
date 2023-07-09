"use client";

import { SingleChoiceQuestionForm } from "@/app/new/components/SingleChoiceQuestionForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { QuestionType } from "../types";

export interface QuestionEditorProps {
  onSubmit: (data: TestQuestionModel) => void;
}

export type TestQuestionModel = z.infer<typeof TestQuestion>;

export interface NewQuestionDialogProps {
  onSubmit: (data: TestQuestionModel) => void;
}

const SingleChoiceQuestion = z.object({
  id: z.string(),
  type: z.literal(QuestionType.SingleChoice),
  options: z.array(z.string()),
  answer: z.string(),
});

const MultipleChoiceQuestion = z.object({
  id: z.string(),
  type: z.literal(QuestionType.MultipleChoice),
  options: z.array(z.string()),
  answer: z.array(z.string()),
});

const NumberInputQuestion = z.object({
  id: z.string(),
  type: z.literal(QuestionType.NumberInput),
  answer: z.number(),
  tolerance: z.number(),
});

const TextInputQuestion = z.object({
  id: z.string(),
  type: z.literal(QuestionType.TextInput),
  answer: z.union([z.string(), z.array(z.string())]),
});

const TestQuestion = z.union([
  SingleChoiceQuestion,
  MultipleChoiceQuestion,
  NumberInputQuestion,
  TextInputQuestion,
]);

const questionEditorSchema = z.object({
  type: z.string(),
});

type questionEditorModel = z.infer<typeof questionEditorSchema>;

const FormContent = (props: { type: QuestionType }) => {
  switch (props.type) {
    case QuestionType.SingleChoice:
      return <SingleChoiceQuestionForm />;
    case QuestionType.MultipleChoice:
      return <div>Multiple choise form</div>;
    case QuestionType.NumberInput:
      return <div>Number input form</div>;
    case QuestionType.TextInput:
      return <div>Text input form</div>;
    default:
      return null;
  }
};

export const QuestionEditor = (_props: QuestionEditorProps) => {
  const form = useForm<questionEditorModel>({
    resolver: zodResolver(questionEditorSchema),
    defaultValues: {
      type: QuestionType.SingleChoice,
    },
  });
  const questionType = form.watch("type") as QuestionType;

  const onSubmit = (values: questionEditorModel) => {
    console.log("question eidtor values", values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={QuestionType.SingleChoice}>
                        Single choise
                      </SelectItem>
                      <SelectItem value={QuestionType.MultipleChoice}>
                        Multiple choise
                      </SelectItem>
                      <SelectItem value={QuestionType.NumberInput}>
                        Number input
                      </SelectItem>
                      <SelectItem value={QuestionType.TextInput}>
                        Text input
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <FormContent type={questionType} />
    </>
  );
};
