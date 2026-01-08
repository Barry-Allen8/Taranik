import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "name.too_short" }),
  email: z.string().email({ message: "email.invalid" }),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, { message: "message.too_short" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
