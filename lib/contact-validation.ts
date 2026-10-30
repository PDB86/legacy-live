import { z } from "zod"

const optionalText = (max: number) => z.string().trim().max(max).optional().default("")

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(150),
  email: z.string().trim().email().max(254),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
    const date = new Date(`${value}T00:00:00Z`)
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
  }),
  eventType: z.enum(["", "wedding", "corporate", "private", "anniversary", "birthday", "other"]).optional().default(""),
  phone: optionalText(50),
  guests: z.string().regex(/^(?:|[1-9]\d{0,5})$/).optional().default(""),
  venue: optionalText(250),
  location: optionalText(250),
  preferences: optionalText(10000),
})
