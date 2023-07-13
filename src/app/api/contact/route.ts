import { mail } from "@/app/api/services/mail-service";
import { contactSchema } from "@/shared/models/contact";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = JSON.parse(await req.json());
  const response = contactSchema.safeParse(data);

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

  const { email, question } = response.data;

  try {
    await mail.sendMail(
      email,
      `From: ${email}\nQuestion: ${question}`,
      "New contact form submission"
    );
    return NextResponse.json(
      { message: "Email sent successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while sending email",
      },
      {
        status: 400,
      }
    );
  }
}
