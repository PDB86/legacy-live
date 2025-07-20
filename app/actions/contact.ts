"use server"

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

    // In a real implementation, you would use a service like Resend, SendGrid, or Nodemailer
    // For now, we'll simulate the email sending
    console.log("Email would be sent to: jacinnagao@gmail.com")
    console.log("Email content:", emailContent)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demonstration, we'll always return success
    // In production, you'd handle actual email sending and error cases
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
