import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";
import { TestsTable } from "./components/TestsTable";

export default function Tests() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <Title>Tests page</Title>

      <div className="flex mb-8">
        <Button>Create new test</Button>
      </div>

      <TestsTable />
    </div>
  );
}
