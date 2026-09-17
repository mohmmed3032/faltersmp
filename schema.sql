-- Run this SQL in your Neon/Postgres dashboard to create the applications table.
-- Idempotent: safe to run multiple times.

CREATE TABLE IF NOT EXISTS applications (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role             TEXT NOT NULL CHECK (role IN ('builder', 'trusted')),
  discord_username TEXT NOT NULL,
  answers          JSONB NOT NULL DEFAULT '{}',
  status           TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  decided_at       TIMESTAMPTZ,
  decided_by       TEXT
);

-- Index for dashboard queries (filter by status, sort by date)
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications (status);
CREATE INDEX IF NOT EXISTS idx_applications_created ON applications (created_at DESC);
