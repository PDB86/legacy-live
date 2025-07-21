"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(formData: FormData) {
  try {
    // Extract form data
    const name = formData.get("name") as string
    const eventDate = formData.get("eventDate") as string
    const eventType = formData.get("eventType") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const guests = formData.get("guests") as string
    const venue = formData.get("venue") as string
    const location = formData.get("location") as string
    const preferences = formData.get("preferences") as string

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
    } else {
      console.log("[Resend] RESEND_API_KEY is present.")
    }

    // Debug: Log before sending
    console.log("[Resend] Attempting to send email to: jacinnagao@gmail.com, pablodellabella@gmail.com")
    console.log("[Resend] Using from address: notifications@legacyliveevents.com")
    let sendResult
    try {
      sendResult = await resend.emails.send({
        from: "notifications@legacyliveevents.com", // Use a verified domain for best results
        to: ["jacinnagao@gmail.com", "pablodellabella@gmail.com"],
        subject: "New Contact Form Submission",
        text: emailContent,
      })
      console.log("[Resend] Email send result:", sendResult)
    } catch (sendError) {
      console.error("[Resend] Error sending email:", sendError)
      return {
        success: false,
        message: "There was an error sending your message. Please try again later or contact us directly.",
      }
    }

    // Simulate API delay (optional, can be removed)
    await new Promise((resolve) => setTimeout(resolve, 1000))

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
