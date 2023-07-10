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
import { FormMode } from "@/lib/form";
import { useToast } from "@/lib/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Circle, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import {
  ChoiceBasedQuestion,
  QuestionChoiceOption,
  QuestionType,
} from "../types";

export const ChoiceBasedQuestionSchema = z.object({
  question: z.string().min(1, "Question cannot be empty"),
  options: z.array(
    z.object({
      value: z.string().min(1, "Option cannot be empty"),
      isAnswer: z.boolean(),
    })
  ),
});

type CreateFormData = {
  mode: FormMode.Create;
  singleChoice: boolean;
};

type EditFormData = {
  mode: FormMode.Edit;
  question: ChoiceBasedQuestion;
  singleChoice: boolean;
};

export type ChoiceBasedQuestionFormData = CreateFormData | EditFormData;

export interface ChoiceBasedQuestionFormProps {
  data: ChoiceBasedQuestionFormData;
  onSubmit: (data: ChoiceBasedQuestion) => void;
}

const EMPTY_OPTION: QuestionChoiceOption = { value: "", isAnswer: false };

export const ChoiceBasedQuestionForm = (
  props: ChoiceBasedQuestionFormProps
) => {
  const toast = useToast();
  const data = props.data.mode === FormMode.Edit ? props.data.question : null;
  const { singleChoice } = props.data;
  const form = useForm<z.infer<typeof ChoiceBasedQuestionSchema>>({
    resolver: zodResolver(ChoiceBasedQuestionSchema),
    defaultValues: {
      question: data?.question ?? "",
      options: data?.options ?? [EMPTY_OPTION],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    rules: { minLength: 0 },
    control: form.control,
    name: "options",
  });

  useEffect(() => {
    form.reset();
  }, [form, append, singleChoice]);

  const onSubmit = (values: z.infer<typeof ChoiceBasedQuestionSchema>) => {
    if (!fields.some((field) => field.isAnswer)) {
      return toast.toast({
        variant: "destructive",
        title: "Invalid form",
        description: "Please mark at least one option as an answer",
      });
    }
    props.onSubmit({
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your question" {...field} />
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
              key={data.id}
              control={form.control}
              name={`options.${index}`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        {field.value.isAnswer ? (
                          <Tooltip>
                            <TooltipTrigger
                              type="button"
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
                              onClick={() => {
                                markAsAnswer(data.id);
                              }}
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
                );
              }}
            />
          );
        })}

        <Button variant="default" type="submit">
          {props.data.mode === FormMode.Create ? "Create" : "Update"}
        </Button>
      </form>
    </Form>
  );
};
