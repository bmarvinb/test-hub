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
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

export type SingleChoiceQuestionModel = z.infer<typeof SingleChoiceQuestion>;

export const SingleChoiceQuestion = z.object({
  question: z.string().min(1),
  options: z.array(
    z.object({
      value: z.string().min(1, { message: "Question option can't be empty" }),
    })
  ),
  answer: z.string().min(1),
});

export const SingleChoiceQuestionForm = () => {
  const form = useForm<SingleChoiceQuestionModel>({
    resolver: zodResolver(SingleChoiceQuestion),
    defaultValues: {
      options: [
        {
          value: "",
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    rules: { minLength: 0 },
    control: form.control,
    name: "options",
  });

  const onSubmit = (values: SingleChoiceQuestionModel) => {
    console.log("submitted", values);
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
          <Label>Answers</Label>
          <Button
            variant="outline"
            onClick={() =>
              append({
                value: "",
              })
            }
          >
            Add
          </Button>
        </div>

        {fields.map((_, index) => {
          return (
            <FormField
              key={index}
              control={form.control}
              name={`options.${index}`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">
                          {index + 1}
                        </span>
                        <Input
                          placeholder={`Question option`}
                          value={field.value.value}
                          onChange={(e) => {
                            field.onChange({
                              value: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          );
        })}

        <Button type="submit">Add question</Button>
      </form>
    </Form>
  );
};
