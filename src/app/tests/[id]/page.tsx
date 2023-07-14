"use client";

import { testsService } from "@/app/new/services/tests-service";
import { Title } from "@/components/ui/Title";
import { TestData } from "@/shared/models/test-model";
import { useQuery } from "@tanstack/react-query";

export default function ViewTest(data: { params: { id: string } }) {
  const id = data.params.id;

  const test = useQuery<unknown, { message: string }, TestData>(
    ["test", id],
    () => {
      return testsService.find(id);
    }
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <Title className="mb-8">View test</Title>

      {test.isLoading ? (
        <div>Loading...</div>
      ) : test.isSuccess ? (
        <div>
          <div>Title: {test.data.title}</div>
          <div>Description: {test.data.description}</div>
        </div>
      ) : (
        <div>Error</div>
      )}
    </div>
  );
}
