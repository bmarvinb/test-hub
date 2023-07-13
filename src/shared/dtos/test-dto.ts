import { z } from "zod";

export enum QuestionType {
  SingleChoice = "single-choice",
  MultipleChoice = "multiple-choice",
  NumberInput = "number-input",
  TextInput = "text-input",
}

const QuestionChoiceOptionSchema = z.object({
  value: z.string(),
  isAnswer: z.boolean(),
});

const choiceBasedQuestionSchema = z.object({
  type: z.enum([QuestionType.SingleChoice, QuestionType.MultipleChoice]),
  question: z.string(),
  options: z.array(QuestionChoiceOptionSchema),
});

const numberInputQuestionSchema = z.object({
  type: z.literal(QuestionType.NumberInput),
  question: z.string(),
  answer: z.number(),
  tolerance: z.number(),
});

const textInputQuestionSchema = z.object({
  type: z.literal(QuestionType.TextInput),
  question: z.string(),
  answer: z.union([z.string(), z.array(z.string())]),
});

const testQuestionSchema = z.union([
  choiceBasedQuestionSchema,
  numberInputQuestionSchema,
  textInputQuestionSchema,
]);

export const mutateTestSchema = z.object({
  title: z.string(),
  description: z.string(),
  questions: z.array(testQuestionSchema),
});

export type MutateTestDTO = z.infer<typeof mutateTestSchema>;

export type TestDTO = {
  id: string;
  title: string;
  description: string;
};
