"use client";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { QuestionEditor } from "./QuestionEditor";

export const NewQuestionDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add question</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add question</DialogTitle>
          <DialogDescription>
            Create new question for your test
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <QuestionEditor onSubmit={(data) => console.log("data", data)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
