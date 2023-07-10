import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";
import Link from "next/link";

export default function Tests() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <Title className="mb-8">Tests page</Title>

      <div className="flex mb-8">
        <Button asChild>
          <Link href="/new">New test</Link>
        </Button>
      </div>
    </div>
  );
}
