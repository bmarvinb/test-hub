"use client";

import { TestEditor } from "@/app/new/components/TestEditor";
import { testsService } from "@/app/new/services/tests-service";
import { TestEditorModel } from "@/app/new/models/test-editor-model";
import { Title } from "@/components/ui/Title";
import { Mode } from "@/lib/form";
import { useToast } from "@/lib/hooks/use-toast";
import { MutateTest, Test } from "@/shared/models/test-model";
import { useMutation, useQuery } from "@tanstack/react-query";

function testToTestEditorModel(dto: Test): TestEditorModel {
  return {
    title: dto.title,
    description: dto.description,
    questions: [],
  };
}

export default function EditTest(data: { params: { id: string } }) {
  const toast = useToast();
  const id = data.params.id;

  const test = useQuery<unknown, { message: string }, Test>(
    ["test", id],
    () => {
      return testsService.find(id);
    }
  );

  console.log("test", test);

  const {
    mutate: updateTest,
    isLoading,
    isError,
  } = useMutation<void, { message: string }, MutateTest>(
    async (data) => testsService.update(id, data),
    {
      onSuccess: () => {
        toast.toast({
          title: "Success",
          description: "Test updated",
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
    updateTest(data);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <Title className="mb-8">Update test</Title>

      {test.isLoading ? (
        <div>Loading...</div>
      ) : test.isSuccess ? (
        <TestEditor
          mode={{ mode: Mode.Edit, test: testToTestEditorModel(test.data) }}
          isLoading={isLoading}
          isError={isError}
          onSubmit={handleSubmit}
        />
      ) : (
        <div>Error</div>
      )}
    </div>
  );
}
