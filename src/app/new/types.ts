export enum QuestionType {
  SingleChoice = "single-choice",
  MultipleChoice = "multiple-choice",
  NumberInput = "number-input",
  TextInput = "text-input",
}

export type ChoiceBasedQuestion = {
  type: QuestionType.SingleChoice | QuestionType.MultipleChoice;
  question: string;
  options: {
    value: string;
    isAnswer: boolean;
  }[];
};

export type NumberInputQuestion = {
  type: QuestionType.NumberInput;
  question: string;
  answer: number;
  tolerance: number;
};

export type TextInputQuestion = {
  type: QuestionType.TextInput;
  question: string;
  answer: string | string[];
};

export type TestQuestionModel =
  | ChoiceBasedQuestion
  | NumberInputQuestion
  | TextInputQuestion;
