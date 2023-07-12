// import { z } from "zod";

// export enum QuestionType {
//   SingleChoice = "single-choice",
//   MultipleChoice = "multiple-choice",
//   NumberInput = "number-input",
//   TextInput = "text-input",
// }

// const QuestionChoiceOptionSchema = z.object({
//   value: z.string(),
//   isAnswer: z.boolean(),
// });

// const choiceBasedQuestionSchema = z.object({
//   type: z.enum([QuestionType.SingleChoice, QuestionType.MultipleChoice]),
//   question: z.string(),
//   options: z.array(QuestionChoiceOptionSchema),
// });

// const numberInputQuestionSchema = z.object({
//   type: z.literal(QuestionType.NumberInput),
//   question: z.string(),
//   answer: z.number(),
//   tolerance: z.number(),
// });

// const textInputQuestionSchema = z.object({
//   type: z.literal(QuestionType.TextInput),
//   question: z.string(),
//   answer: z.union([z.string(), z.array(z.string())]),
// });

// const testQuestionSchema = z.union([
//   choiceBasedQuestionSchema,
//   numberInputQuestionSchema,
//   textInputQuestionSchema,
// ]);

// export const createTestSchema = z.object({
//   title: z.string(),
//   description: z.string(),
//   questions: z.array(testQuestionSchema),
// });

// export type CreateTestDTO = z.infer<typeof createTestSchema>;

// import prisma from "@/lib/prisma";

// export interface TestsService {
//   create(test: CreateTestDTO): Promise<{ id: string }>;
// }

// export const testsService: TestsService = {
//   create: async (testDTO: CreateTestDTO) => {
//     // const test = new TestModel(testDTO);

//     try {
//       const { id } = await prisma.test.create({
//         data: {
//           title: testDTO.title,
//           description: testDTO.description,
//         },
//       });

//       return { id };
//     } catch (error) {
//       console.error("Test creation failed", error);
//       throw error;
//     }
//   },
// };
