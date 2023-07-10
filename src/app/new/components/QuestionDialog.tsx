"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

export type DialogContext = {
  isOpen: boolean;
  mode: "create" | "edit";
};

export interface QuestionDialogProps {
  context: DialogContext;
  children: React.ReactNode;
  onClose: () => void;
}

export const QuestionDialog = (props: QuestionDialogProps) => {
  const title =
    props.context.mode === "create" ? "Add question" : "Edit question";

  const description =
    props.context.mode === "create"
      ? "Add a new question to the test"
      : "Edit the question";

  return (
    <Dialog open={props.context.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">{props.children}</div>
      </DialogContent>
    </Dialog>
  );
};
