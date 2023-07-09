"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

export interface QuestionDialogProps {
  isOpen: boolean;
  toggleIsOpen: (open: boolean) => void;
  children: React.ReactNode;
}

export const QuestionDialog = (props: QuestionDialogProps) => {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.toggleIsOpen}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add question</DialogTitle>
          <DialogDescription>
            Create new question for your test
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">{props.children}</div>
      </DialogContent>
    </Dialog>
  );
};
