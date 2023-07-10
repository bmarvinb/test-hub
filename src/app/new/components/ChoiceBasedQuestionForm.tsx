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
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Circle, XCircle } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { ChoiceBasedQuestion, QuestionType } from "../types";

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

export const ChoiceBasedQuestionForm = (
  props: ChoiceBasedQuestionFormProps
) => {
  const data = props.data.mode === FormMode.Edit ? props.data.question : null;
  const form = useForm<z.infer<typeof ChoiceBasedQuestionSchema>>({
    resolver: zodResolver(ChoiceBasedQuestionSchema),
    defaultValues: {
      question: data?.question ?? "",
      options: data?.options ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    rules: { minLength: 0 },
    control: form.control,
    name: "options",
  });

  const onSubmit = (values: z.infer<typeof ChoiceBasedQuestionSchema>) => {
    props.onSubmit({
      type: props.data.singleChoice
        ? QuestionType.SingleChoice
        : QuestionType.MultipleChoice,
      ...values,
    });
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

        {fields.length === 0 ? (
          <div className="text-gray-500 text-sm">No added options</div>
        ) : (
          fields.map(({ id }, index) => {
            return (
              <FormField
                key={id}
                control={form.control}
                name={`options.${index}`}
                render={({ field }) => {
                  console.log("field", field);
                  return (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-3">
                          {field.value.isAnswer ? (
                            <Tooltip>
                              <TooltipTrigger
                                type="button"
                                onClick={() =>
                                  field.onChange({
                                    value: field.value.value,
                                    isAnswer: false,
                                  })
                                }
                              >
                                <CheckCircle2 className="text-green-500" />
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
                                  field.onChange({
                                    value: field.value.value,
                                    isAnswer: true, // TODO: wrong implementation
                                  });
                                }}
                              >
                                <Circle className="text-gray-500" />
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
                              onClick={() => remove(index)}
                            >
                              <XCircle className="text-red-400" />
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
          })
        )}

        <Button variant="default" type="submit">
          {props.data.mode === FormMode.Create ? "Create" : "Update"}
        </Button>
      </form>
    </Form>
  );
};
