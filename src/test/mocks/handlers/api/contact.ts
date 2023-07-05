import { rest } from "msw";

export const contactHandlers = [
  rest.post(`/api/contact`, async (_req, res, ctx) => {
    return res(ctx.delay(400), ctx.status(200), ctx.json({ healthy: true }));
  }),
];
