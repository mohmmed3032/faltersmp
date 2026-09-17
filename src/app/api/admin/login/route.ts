import { NextRequest, NextResponse } from "next/server";
import { signSession } from "@/lib/session";

// In-memory rate limiter for login attempts
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_WINDOW = 15 * 60 * 1000; // 15 minutes

function checkLoginRate(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + LOCKOUT_WINDOW });
    return true;
  }

  if (entry.count >= MAX_ATTEMPTS) return false;

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Rate limit login attempts
  if (!checkLoginRate(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "Admin login is not configured." },
      { status: 503 }
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.password || body.password !== adminPassword) {
    return NextResponse.json(
      { error: "Incorrect password." },
      { status: 401 }
    );
  }

  // Create signed session cookie
  const sessionData = `admin:${Date.now()}`;
  const signed = await signSession(sessionData);

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", signed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
