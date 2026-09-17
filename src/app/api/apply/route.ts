import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

// --- Rate limiter (in-memory, per IP) ---
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

const VALID_ROLES = ["builder", "trusted"] as const;
const MAX_FIELD_LEN = 2000;

function sanitize(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw.trim().slice(0, MAX_FIELD_LEN);
}

function escapeMarkdown(str: string): string {
  return str.replace(/[_*~`>|]/g, "\\$&");
}

// Fields that should be validated as required per role
const REQUIRED_BY_ROLE: Record<string, string[]> = {
  builder: [
    "discordUsername",
    "minecraftUsername",
    "activity",
    "buildingExperience",
    "minecraftEdition",
    "commitment",
    "age",
  ],
  trusted: [
    "discordUsername",
    "age",
    "leakAcknowledgement",
    "activity",
    "whyBetter",
  ],
};

// Friendly labels for Discord embed field names
const FIELD_LABELS: Record<string, string> = {
  discordUsername: "Discord Username",
  minecraftUsername: "Minecraft Username",
  activity: "Activity Level",
  buildingExperience: "Building Experience",
  minecraftEdition: "Minecraft Edition",
  commitment: "Commitment Acknowledgement",
  age: "Age",
  whyTrusted: "Why Trusted?",
  leakAcknowledgement: "Leak Acknowledgement",
  whyBetter: "Why Better Than Others?",
  anythingElse: "Anything Else?",
};

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Rate limit
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Parse body
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { role } = body;

  // Validate role
  if (!role || !VALID_ROLES.includes(role as (typeof VALID_ROLES)[number])) {
    return NextResponse.json({ error: "Invalid role selected." }, { status: 400 });
  }

  // Validate required fields
  const requiredFields = REQUIRED_BY_ROLE[role] || [];
  for (const fieldId of requiredFields) {
    const val = sanitize(body[fieldId]);
    if (val.length === 0) {
      return NextResponse.json(
        { error: `${FIELD_LABELS[fieldId] || fieldId} is required.` },
        { status: 400 }
      );
    }
  }

  // Sanitize all fields into answers object
  const answers: Record<string, string> = {};
  const knownFields = [
    "discordUsername",
    "minecraftUsername",
    "activity",
    "buildingExperience",
    "minecraftEdition",
    "commitment",
    "age",
    "whyTrusted",
    "leakAcknowledgement",
    "whyBetter",
    "anythingElse",
  ];

  for (const fieldId of knownFields) {
    const val = sanitize(body[fieldId]);
    if (val) answers[fieldId] = val;
  }

  // Insert into database
  let dbError = false;
  try {
    await sql()`
      INSERT INTO applications (role, discord_username, answers)
      VALUES (${role}, ${answers.discordUsername || ""}, ${JSON.stringify(answers)})
    `;
  } catch (err) {
    console.error("Database insert error:", err);
    dbError = true;
  }

  // Fire Discord webhook as heads-up notification
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (webhookUrl) {
    const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
    const timestamp = new Date().toISOString();

    const fields = [
      { name: "Role Applied For", value: `\`${roleLabel}\``, inline: true },
      { name: "Discord Username", value: `\`${escapeMarkdown(answers.discordUsername || "N/A")}\``, inline: true },
    ];

    if (answers.minecraftUsername) {
      fields.push({ name: "Minecraft Username", value: escapeMarkdown(answers.minecraftUsername), inline: true });
    }
    if (answers.age) {
      fields.push({ name: "Age", value: escapeMarkdown(answers.age), inline: true });
    }
    if (answers.activity) {
      fields.push({ name: "Activity", value: escapeMarkdown(answers.activity), inline: true });
    }
    if (answers.buildingExperience) {
      fields.push({ name: "Building Experience", value: escapeMarkdown(answers.buildingExperience), inline: false });
    }
    if (answers.minecraftEdition) {
      fields.push({ name: "Minecraft Edition", value: escapeMarkdown(answers.minecraftEdition), inline: true });
    }
    if (answers.commitment) {
      fields.push({ name: "Commitment", value: escapeMarkdown(answers.commitment), inline: true });
    }
    if (answers.whyTrusted) {
      fields.push({ name: "Why Trusted?", value: escapeMarkdown(answers.whyTrusted), inline: false });
    }
    if (answers.leakAcknowledgement) {
      fields.push({ name: "Leak Acknowledgement", value: escapeMarkdown(answers.leakAcknowledgement), inline: true });
    }
    if (answers.whyBetter) {
      fields.push({ name: "Why Better?", value: escapeMarkdown(answers.whyBetter), inline: false });
    }
    if (answers.anythingElse) {
      fields.push({ name: "Anything Else?", value: escapeMarkdown(answers.anythingElse), inline: false });
    }

    const embed = {
      title: `New Application — ${roleLabel}`,
      color: 0x7a0c0c,
      fields,
      timestamp,
      footer: { text: "Falter SMP Applications — check /admin for details" },
    };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embeds: [embed] }),
      });
    } catch (err) {
      console.error("Discord webhook error:", err);
    }
  }

  if (dbError) {
    return NextResponse.json(
      { error: "Failed to save application. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
