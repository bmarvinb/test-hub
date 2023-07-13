import { mutateTestSchema } from "@/shared/dtos/test-dto";
import { NextResponse } from "next/server";
import { testService } from "../../services/test-service";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const test = testService();

  try {
    const data = await test.find(params.id);
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
      },
      {
        status: 400,
      }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
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
    const { id } = await test.update(params.id, response.data);
    return NextResponse.json(
      { message: "Test updated", id },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while updating test",
      },
      {
        status: 400,
      }
    );
  }
}
