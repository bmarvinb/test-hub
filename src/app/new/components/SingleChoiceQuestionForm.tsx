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
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Circle, XCircle } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { QuestionType } from "../types";

export type SingleChoiceQuestionModel = z.infer<typeof SingleChoiceQuestion>;

export const SingleChoiceQuestion = z.object({
  type: z.literal(QuestionType.SingleChoice),
  question: z.string().min(1, "Question cannot be empty"),
  options: z.array(
    z.object({
      value: z.string().min(1, "Option cannot be empty"),
      isAnswer: z.boolean(),
    })
  ),
});

export interface SingleChoiceQuestionFormProps {
  onSubmit: (data: SingleChoiceQuestionModel) => void;
}
export const SingleChoiceQuestionForm = (
  props: SingleChoiceQuestionFormProps
) => {
  const form = useForm<SingleChoiceQuestionModel>({
    resolver: zodResolver(SingleChoiceQuestion),
    defaultValues: {
      type: QuestionType.SingleChoice,
      question: "Sample question",
      options: [
        { value: "Option 1", isAnswer: false },
        { value: "Option 2", isAnswer: true },
      ],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    rules: { minLength: 0 },
    control: form.control,
    name: "options",
  });

  const markAsAnswer = (id: string) => {
    fields.forEach((field, index) =>
      update(index, { ...field, isAnswer: field.id === id })
    );
  };

  const unmarkAsAnswer = (id: string) => {
    fields.forEach((field, index) => {
      if (field.id !== id) {
        return;
      }
      update(index, { ...field, isAnswer: false });
    });
  };

  const onSubmit = (values: SingleChoiceQuestionModel) => {
    props.onSubmit(values);
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
          fields.map(({ id, isAnswer }, index) => {
            return (
              <FormField
                key={id}
                control={form.control}
                name={`options.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        {isAnswer ? (
                          <Tooltip>
                            <TooltipTrigger
                              type="button"
                              onClick={() => unmarkAsAnswer(id)}
                            >
                              <CheckCircle2 className="text-green-500 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Unmark as answer</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <Tooltip>
                            <TooltipTrigger
                              type="button"
                              onClick={() => markAsAnswer(id)}
                            >
                              <Circle className="text-gray-500 cursor-pointer" />
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
                              isAnswer: false,
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
                )}
              />
            );
          })
        )}

        <Button variant="default" type="submit">
          Create
        </Button>
      </form>
    </Form>
  );
};
