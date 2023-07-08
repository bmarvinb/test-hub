import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";

export default function Tests() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <Title>Tests page</Title>

      <div className="flex mb-8">
        <Button>Create new test</Button>
      </div>

      <div className="border p-4 rounded">
        <div className="mb-8">
          <div className="p-2 font-semibold">Title</div>
          <div className="p-2 border-b">Test 1</div>
          <div className="p-2 border-b">Test 2</div>
          <div className="p-2 border-b">Test 3</div>
          <div className="p-2 border-b">Test 4</div>
          <div className="p-2 border-b">Test 5</div>
          <div className="p-2 border-b">Test 6</div>
          <div className="p-2 border-b">Test 7</div>
          <div className="p-2 border-b">Test 8</div>
          <div className="p-2 border-b">Test 9</div>
          <div className="p-2 border-b">Test 10</div>
        </div>

        <div className="flex gap-4 justify-center">
          <div>Prev</div>
          <div className="font-bold">1</div>
          <div>2</div>
          <div>3</div>
          <div>Next</div>
        </div>
      </div>
    </div>
  );
}
