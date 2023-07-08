import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";

export default function NewTest() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <Title>New test</Title>

      <div className="flex mb-8">
        <Button>Create</Button>
      </div>
    </div>
  );
}
