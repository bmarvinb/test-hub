import { mutateTestSchema } from "@/shared/dtos/test-dto";
import { NextResponse } from "next/server";
import { testService } from "../services/test-service";

export async function POST(req: Request) {
  const data = JSON.parse(await req.json());
  const response = mutateTestSchema.safeParse(data);

  if (!response.success) {
    return NextResponse.json(
      {
        message: "Invalid request parameters",
        issues: response.error.issues,
      },
      {
        status: 400,
      }
    );
  }

  const test = testService();

  try {
    const { id } = await test.create(response.data);
    return NextResponse.json(
      { message: "Test created", id },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while creating test",
      },
      {
        status: 400,
      }
    );
  }
}
