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

export const testSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

export type MutateTestData = z.infer<typeof mutateTestSchema>;

export type TestData = z.infer<typeof testSchema>;