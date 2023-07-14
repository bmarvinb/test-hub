import { z } from "zod";

export const contactSchema = z.object({
  email: z.string(),
  question: z.string(),
});

export const contactErrorSchema = z.object({
  message: z.string(),
  issues: z.unknown().array().optional(),
});

export type Contact = z.infer<typeof contactSchema>;

export type ContactError = z.infer<typeof contactErrorSchema>;
