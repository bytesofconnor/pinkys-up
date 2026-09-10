-- Community events Brenda can manage from /admin/events
-- Run this in the Supabase SQL editor

CREATE TABLE IF NOT EXISTS community_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name VARCHAR(160) NOT NULL,
  description TEXT NOT NULL,
  starts_at TIMESTAMPTZ,
  location VARCHAR(200) NOT NULL,
  time_zone VARCHAR(64) NOT NULL DEFAULT 'America/Chicago',
  registration_url TEXT,
  published BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_community_events_starts_at
  ON community_events (starts_at);

ALTER TABLE community_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage community events"
  ON community_events
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

COMMENT ON TABLE community_events IS 'Public community wellness events managed from the PINKYS UP admin.';
