import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  message: z.string().min(10).max(4000),
  website: z.string().max(0).optional(), // honeypot
});

export type ContactInput = z.infer<typeof Schema>;

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Schema.parse(data))
  .handler(async ({ data }) => {
    // Log to server console — production hookup (Resend / Cloud table) can be added later.
    console.log("[contact]", {
      at: new Date().toISOString(),
      name: data.name,
      email: data.email,
      messagePreview: data.message.slice(0, 200),
    });
    return { ok: true };
  });
