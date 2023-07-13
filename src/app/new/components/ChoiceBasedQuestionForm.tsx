"use client";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Mode } from "@/lib/form";
import { useToast } from "@/lib/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Circle, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { ChoiceBasedQuestion, QuestionChoiceOption } from "../types";
import { QuestionType } from "@/shared/dtos/test-dto";

type CommonFormData = {
  singleChoice: boolean;
};

type CreateFormData = CommonFormData & {
  mode: Mode.Create;
};

type EditFormData = CommonFormData & {
  mode: Mode.Edit;
  question: ChoiceBasedQuestion;
};

export type FormData = CreateFormData | EditFormData;

export interface ChoiceBasedQuestionFormProps {
  data: FormData;
  onSubmit: (data: ChoiceBasedQuestion) => void;
}

const EMPTY_OPTION: QuestionChoiceOption = { value: "", isAnswer: false };

function isEditMode(context: FormData): context is EditFormData {
  return context.mode === Mode.Edit;
}

const ChoiceBasedQuestionSchema = z.object({
  question: z.string().min(1, "Question cannot be empty"),
  options: z.array(
    z.object({
      value: z.string().min(1, "Option cannot be empty"),
      isAnswer: z.boolean(),
    })
  ),
});

export const ChoiceBasedQuestionForm = ({
  data,
  onSubmit,
}: ChoiceBasedQuestionFormProps) => {
  const toast = useToast();
  const { singleChoice } = data;
  const defaultValues = isEditMode(data)
    ? {
        question: data.question.question,
        options: data.question.options,
      }
    : {
        question: "",
        options: [EMPTY_OPTION],
      };

  const form = useForm<z.infer<typeof ChoiceBasedQuestionSchema>>({
    resolver: zodResolver(ChoiceBasedQuestionSchema),
    defaultValues,
  });

  const { fields, append, remove, update } = useFieldArray({
    rules: { minLength: 0 },
    control: form.control,
    name: "options",
  });

  useEffect(() => {
    form.reset();
  }, [form, singleChoice]);

  const handleSubmit = (values: z.infer<typeof ChoiceBasedQuestionSchema>) => {
    if (!fields.some((field) => field.isAnswer)) {
      return toast.toast({
        variant: "destructive",
        title: "Invalid form",
        description: "Please mark at least one option as an answer",
      });
    }
    onSubmit({
      type: singleChoice
        ? QuestionType.SingleChoice
        : QuestionType.MultipleChoice,
      ...values,
    });
  };

  const markAsAnswer = (id: string) => {
    fields.forEach((field, index) => {
      const values = form.getValues("options")[index];
      if (singleChoice) {
        update(index, {
          ...values,
          isAnswer: false,
        });
      }
      if (field.id === id) {
        update(index, {
          ...values,
          isAnswer: true,
        });
      }
    });
  };

  const unmarkAsAnswer = (index: number) => {
    update(index, { ...form.getValues("options")[index], isAnswer: false });
  };

  const removeOption = (index: number) => {
    fields.length === 1 ? update(index, EMPTY_OPTION) : remove(index);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your question"
                  {...field}
                  data-testid="question"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center">
          <Label>Options</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              append({
                value: "",
                isAnswer: false,
              })
            }
          >
            Add option
          </Button>
        </div>

        {fields.map((data, index) => {
          return (
            <FormField
              key={index}
              // key={`options.${index}`}
              control={form.control}
              name={`options.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      className="flex items-center gap-3"
                      data-testid={`options.${index}`}
                    >
                      {data.isAnswer ? (
                        <Tooltip>
                          <TooltipTrigger
                            type="button"
                            data-testid={`options.${index}.unmark-as-answer`}
                            onClick={() => {
                              unmarkAsAnswer(index);
                            }}
                          >
                            <CheckCircle2
                              size={20}
                              className="text-green-500"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Unmark as answer</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger
                            type="button"
                            data-testid={`options.${index}.mark-as-answer`}
                            onClick={() => markAsAnswer(data.id)}
                          >
                            <Circle size={20} className="text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Mark as answer</p>
                          </TooltipContent>
                        </Tooltip>
                      )}

                      <Input
                        placeholder={`Question option`}
                        value={field.value.value}
                        data-testid={`options.${index}.option`}
                        onChange={(e) => {
                          field.onChange({
                            value: e.target.value,
                            isAnswer: field.value.isAnswer,
                          });
                        }}
                      />

                      <Tooltip>
                        <TooltipTrigger
                          type="button"
                          data-testid={`options.${index}.remove-option`}
                          onClick={() => removeOption(index)}
                        >
                          <XCircle size={20} className="text-red-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remove option</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        <Button
          variant="default"
          type="submit"
          data-testid="choice-based-submit-button"
        >
          {isEditMode(data) ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};
