import { z } from "zod";
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters.")
    .max(100),
  email: z.email("Please enter a valid email address.").max(254),
  subject: z.string().trim().min(3, "Please enter a subject.").max(150),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters.")
    .max(5000, "Keep your message under 5,000 characters."),
});
export type ContactInput = z.infer<typeof contactSchema>;
