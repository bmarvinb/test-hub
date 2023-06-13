import { rest } from "msw";

export const contactHandlers = [
  rest.post(`/api/contact`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ healthy: true }));
  }),
];
