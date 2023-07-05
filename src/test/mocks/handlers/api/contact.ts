import { rest } from "msw";
import { ContactDTO } from "@/app/contact/services/contact";

export const contactHandlers = [
  rest.post(`/api/contact`, async (req, res, ctx) => {
    const data: ContactDTO = await req.json();

    if (!data.email.includes("@")) {
      return res(
        ctx.delay(300),
        ctx.status(400),
        ctx.json({ message: "Invalid email" })
      );
    }

    if (data.question.includes("Error")) {
      return res(
        ctx.delay(300),
        ctx.status(500),
        ctx.json({ message: "Server error" })
      );
    }

    return res(ctx.delay(400), ctx.status(200), ctx.json({ healthy: true }));
  }),
];
