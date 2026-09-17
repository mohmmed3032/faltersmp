import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

interface ApplicationRow {
  id: string;
  role: string;
  discord_username: string;
  answers: Record<string, string>;
  status: string;
  created_at: string;
  decided_at: string | null;
  decided_by: string | null;
}

// GET — list applications with optional filters
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  const status = searchParams.get("status");

  let rows: ApplicationRow[];

  if (role && status) {
    rows = await sql()`
      SELECT * FROM applications
      WHERE role = ${role} AND status = ${status}
      ORDER BY created_at DESC
    ` as ApplicationRow[];
  } else if (role) {
    rows = await sql()`
      SELECT * FROM applications
      WHERE role = ${role}
      ORDER BY created_at DESC
    ` as ApplicationRow[];
  } else if (status) {
    rows = await sql()`
      SELECT * FROM applications
      WHERE status = ${status}
      ORDER BY created_at DESC
    ` as ApplicationRow[];
  } else {
    rows = await sql()`
      SELECT * FROM applications
      ORDER BY created_at DESC
    ` as ApplicationRow[];
  }

  return NextResponse.json(rows);
}

// PATCH — update application status
export async function PATCH(request: NextRequest) {
  let body: { id?: string; status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json({ error: "Missing id or status." }, { status: 400 });
  }

  if (!["accepted", "declined"].includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  try {
    await sql()`
      UPDATE applications
      SET status = ${status}, decided_at = now(), decided_by = 'admin'
      WHERE id = ${id}
    `;
  } catch (err) {
    console.error("Database update error:", err);
    return NextResponse.json({ error: "Failed to update application." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
