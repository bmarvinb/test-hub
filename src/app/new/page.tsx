import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";
import { TestEditor } from "./components/TestEditor";

export default function NewTest() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <Title>New test</Title>

      <TestEditor />

      <div className="flex mb-8">
        <Button>Create</Button>
      </div>
    </div>
  );
}
