"use client";

import { Title } from "@/components/ui/Title";
import { useToast } from "@/lib/hooks/use-toast";
import { MutateTestDTO } from "@/shared/dtos/test-dto";
import { useMutation } from "@tanstack/react-query";
import { TestEditor } from "./components/TestEditor";
import { testsService } from "./services/tests-service";
import { TestEditorModel } from "./types";

export default function NewTest() {
  const toast = useToast();
  const {
    mutate: createTest,
    isLoading,
    isError,
  } = useMutation<void, { message: string }, MutateTestDTO>(
    async (data) => testsService.create(data),
    {
      onSuccess: () => {
        toast.toast({
          title: "Test created",
          description: "You can start sharing your test now",
        });
      },
      onError: (error) => {
        console.log("Error", error);
        toast.toast({
          variant: "destructive",
          title: "Error occurred",
          description: error.message,
        });
      },
    }
  );

  const handleSubmit = (data: TestEditorModel) => {
    createTest(data);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <Title className="mb-8">Create test</Title>

      <TestEditor
        isLoading={isLoading}
        isError={isError}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
