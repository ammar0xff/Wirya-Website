import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, language } = await request.json()

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: language === "ar" ? "البريد الإلكتروني غير صحيح" : "Invalid email address" },
        { status: 400 },
      )
    }

    // Get all subscribers from localStorage (in production, use a database)
    // For now, we'll just acknowledge the subscription
    const newSubscriber = {
      id: Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString(),
      language,
      status: "active",
    }

    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Add to email list service (Mailchimp, etc.)

    console.log("[v0] New newsletter subscriber:", newSubscriber)

    return NextResponse.json({
      message: language === "ar" ? "شكراً لاشتراكك في نشرتنا البريدية!" : "Thank you for subscribing!",
      subscriber: newSubscriber,
    })
  } catch (error) {
    console.error("[v0] Newsletter subscription error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
