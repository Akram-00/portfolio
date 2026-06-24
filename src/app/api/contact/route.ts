import { NextRequest, NextResponse } from "next/server";

// Simple in-memory cache to rate-limit by IP as a secondary defense
const ipCache = new Map<string, number>();

// Clean up IP cache every 10 minutes to prevent memory bloat
if (typeof global !== "undefined") {
  const globalAny = global as any;
  if (!globalAny.ipCacheInterval) {
    globalAny.ipCacheInterval = setInterval(() => {
      const now = Date.now();
      for (const [ip, timestamp] of ipCache.entries()) {
        if (now - timestamp > 300000) { // 5 minutes expiry
          ipCache.delete(ip);
        }
      }
    }, 600000); // 10 minutes interval
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Parse request body
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    // 2. Serverside Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide a message (minimum 10 characters)." },
        { status: 400 }
      );
    }

    // 3. Rate Limiting Check
    // A. Check Client-Side Submission Cookie
    const lastSubmitCookie = req.cookies.get("contact_last_submit")?.value;
    const now = Date.now();
    const limitDuration = 60000; // 60 seconds rate limit

    if (lastSubmitCookie) {
      const timeElapsed = now - Number(lastSubmitCookie);
      if (timeElapsed < limitDuration) {
        const secondsRemaining = Math.ceil((limitDuration - timeElapsed) / 1000);
        return NextResponse.json(
          {
            success: false,
            error: `Spam protection active. Please wait ${secondsRemaining} seconds before sending another message.`
          },
          { status: 429 }
        );
      }
    }

    // B. Check Server-Side IP Cache
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "anonymous";
    const lastIpTime = ipCache.get(ip);
    if (lastIpTime) {
      const timeElapsed = now - lastIpTime;
      if (timeElapsed < limitDuration) {
        const secondsRemaining = Math.ceil((limitDuration - timeElapsed) / 1000);
        return NextResponse.json(
          {
            success: false,
            error: `Too many requests from this IP. Please wait ${secondsRemaining} seconds.`
          },
          { status: 429 }
        );
      }
    }

    // 4. Check Webhook URL Configuration
    const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("[CONTACT ERROR] CONTACT_FORM_WEBHOOK_URL environment variable is not defined.");
      return NextResponse.json(
        {
          success: false,
          error: "API is active but webhook endpoint is not configured. Please set the CONTACT_FORM_WEBHOOK_URL environment variable."
        },
        { status: 501 } // Not Implemented
      );
    }

    // 5. Send POST request to Google Apps Script
    const gasResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim()
      }),
      // Set a reasonable timeout
      signal: AbortSignal.timeout(10000)
    }).catch((err) => {
      console.error("[CONTACT EXCEPTION] Failed to fetch Google Apps Script:", err);
      return null;
    });

    if (!gasResponse) {
      return NextResponse.json(
        { success: false, error: "Failed to connect to Google Sheets backend. Please try again later." },
        { status: 502 }
      );
    }

    const gasData = await gasResponse.json().catch(() => null);

    if (!gasResponse.ok || !gasData || gasData.success === false) {
      const errorMsg = gasData?.message || gasData?.error || "Error storing sheet record.";
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 500 }
      );
    }

    // 6. Request Successful: Record IP Cache and return response with Rate Limit Cookie
    ipCache.set(ip, now);

    const res = NextResponse.json(
      { success: true, message: "Your message has been sent successfully!" },
      { status: 200 }
    );

    // Set cookie to prevent client-side spamming for 60 seconds
    res.cookies.set("contact_last_submit", now.toString(), {
      maxAge: 60, // 60 seconds
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    return res;

  } catch (error: any) {
    console.error("[CONTACT API EXCEPTION]:", error);
    return NextResponse.json(
      { success: false, error: "An internal server error occurred while processing your message." },
      { status: 500 }
    );
  }
}
