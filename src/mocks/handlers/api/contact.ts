import { rest } from "msw";
import { ContactDTO } from "@/app/contact/api";

export const contactHandlers = [
  rest.post(`/api/contact`, async (req, res, ctx) => {
    const data: ContactDTO = await req.json();

    if (data.question.includes("500")) {
      return res(
        ctx.delay(400),
        ctx.status(500),
        ctx.json({ error: "Server error" })
      );
    }

    if (data.question.includes("400")) {
      return res(
        ctx.delay(400),
        ctx.status(400),
        ctx.json({ error: "Something goes wrong" })
      );
    }

    return res(ctx.delay(400), ctx.status(200), ctx.json({ healthy: true }));
  }),
];
