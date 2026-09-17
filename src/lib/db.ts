import { neon } from "@neondatabase/serverless";

let _sql: ReturnType<typeof neon> | null = null;

export function sql() {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not set");
    }
    _sql = neon(url);
  }
  return _sql;
}

// --- Schema (run once in your Neon dashboard) ---
// CREATE TABLE IF NOT EXISTS applications (
//   id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   role             TEXT NOT NULL CHECK (role IN ('builder', 'trusted')),
//   discord_username TEXT NOT NULL,
//   answers          JSONB NOT NULL DEFAULT '{}',
//   status           TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
//   created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
//   decided_at       TIMESTAMPTZ,
//   decided_by       TEXT
// );
//
// CREATE INDEX IF NOT EXISTS idx_applications_status ON applications (status);
// CREATE INDEX IF NOT EXISTS idx_applications_created ON applications (created_at DESC);
