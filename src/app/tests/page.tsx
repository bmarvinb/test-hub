"use client";

import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";
import { Test } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { testsService } from "../new/services/tests-service";

export default function Tests() {
  const tests = useQuery<unknown, { message: string }, Test[]>(
    ["tests"],
    () => {
      return testsService.findAll();
    }
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <Title className="mb-8">Tests page</Title>

      <div className="flex mb-8">
        <Button asChild>
          <Link href="/new">New test</Link>
        </Button>
      </div>

      <div>
        <Title size="h2" className="mb-6">
          Tests list
        </Title>

        <div>
          {tests.isLoading ? (
            <div>Loading...</div>
          ) : tests.isSuccess ? (
            <div>
              {tests.data.map((test) => (
                <div key={test.id}>
                  <Link href={`/tests/${test.id}`}>{test.title}</Link>
                </div>
              ))}
            </div>
          ) : (
            <div>Error</div>
          )}
        </div>
      </div>
    </div>
  );
}
