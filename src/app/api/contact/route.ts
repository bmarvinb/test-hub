import { sendMail } from "@/app/api/services/mail";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  question: z.string(),
});

export async function POST(req: Request) {
  const data = await req.json();
  const response = schema.safeParse(data);

  if (!response.success) {
    return NextResponse.json(
      { message: "Invalid request parameters", errors: [response.error] },
      {
        status: 400,
      }
    );
  }

  const { email, question } = response.data;

  try {
    await sendMail(email, question);
    return NextResponse.json(
      { message: "Email sent successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error while sending email",
        errors: [],
      },
      {
        status: 400,
      }
    );
  }
}
