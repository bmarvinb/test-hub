"use client";

import { Title } from "@/components/ui/Title";
import { TestEditor } from "./components/TestEditor";

export default function NewTest() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <Title className="mb-8">New test</Title>

      <TestEditor onSubmit={(data) => console.log("data", data)} />
    </div>
  );
}
