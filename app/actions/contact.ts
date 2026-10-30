"use server"

import { Resend } from "resend"
import { contactSchema } from "@/lib/contact-validation"

export async function submitContactForm(formData: FormData) {
  try {
    const parsed = contactSchema.safeParse(Object.fromEntries(formData))
    if (!parsed.success) {
      return { success: false, message: "Please enter a valid name, email address, event date, and event details." }
    }
    const { name, eventDate, eventType, email, phone, guests, venue, location, preferences } = parsed.data

    // Create email content
    const emailContent = `
New Contact Form Submission - Legacy Live Entertainment

Contact Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

Event Details:
- Event Date: ${eventDate}
- Event Type: ${eventType}
- Expected Guests: ${guests || "Not specified"}
- Venue: ${venue || "Not specified"}
- Location: ${location || "Not specified"}

Additional Information:
${preferences || "None provided"}

---
This inquiry was submitted through the Legacy Live Entertainment website.
    `

    // Debug: Log API key presence
    if (!process.env.RESEND_API_KEY) {
      console.error("[Resend] RESEND_API_KEY is missing from environment variables.")
      return {
        success: false,
        message: "Email service is not configured. Please contact us directly.",
      }
    }

    // Debug: Log before sending
    const resend = new Resend(process.env.RESEND_API_KEY)
    let sendResult
    try {
      sendResult = await resend.emails.send({
        from: "notifications@legacyliveevents.com", // Use a verified domain for best results
        to: ["jacinnagao@gmail.com", "pablodellabella@gmail.com"],
        subject: "New Contact Form Submission",
        replyTo: email,
        text: emailContent,
      })
      if (sendResult.error || !sendResult.data?.id) {
        console.error("Contact email rejected", sendResult.error?.name)
        return { success: false, message: "There was an error sending your message. Please try again later or call +1 (305) 968-3889." }
      }
    } catch {
      console.error("Contact email request failed")
      return {
        success: false,
        message: "There was an error sending your message. Please try again later or contact us directly.",
      }
    }

    return {
      success: true,
      message: "Thank you for your inquiry! We'll be in touch within 24 hours to discuss your event.",
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return {
      success: false,
      message:
        "We're sorry, there was an error submitting your inquiry. Please try again or contact us directly at +1 (305) 968-3889.",
    }
  }
}
