import { mutateTestSchema } from "@/shared/models/test";
import { NextResponse } from "next/server";
import { testService } from "../services/test-service";

const { create } = testService();

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

  try {
    const { id } = await create(response.data);
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
