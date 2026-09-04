-- Create quote_submissions table
-- Run this in your Supabase SQL editor to set up the database

CREATE TABLE IF NOT EXISTS quote_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  services TEXT[] NOT NULL,
  event_type VARCHAR(120) NOT NULL,
  event_date DATE NOT NULL,
  location VARCHAR(200) NOT NULL,
  guest_count INTEGER NOT NULL,
  referral_source VARCHAR(200),
  additional_details TEXT,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  email_error TEXT
);

-- Create index on created_at for efficient sorting
CREATE INDEX IF NOT EXISTS idx_quote_submissions_created_at 
  ON quote_submissions(created_at DESC);

-- Create index on email for lookups
CREATE INDEX IF NOT EXISTS idx_quote_submissions_email 
  ON quote_submissions(email);

-- Enable Row Level Security (RLS)
ALTER TABLE quote_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to do everything
-- (Next.js server actions will use the service key)
CREATE POLICY "Service role can manage all quote submissions"
  ON quote_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Optional: Create policy for authenticated admin users to view submissions
-- Uncomment and modify if you want to allow authenticated Supabase users to view
-- CREATE POLICY "Authenticated users can view quote submissions"
--   ON quote_submissions
--   FOR SELECT
--   TO authenticated
--   USING (true);

-- Add comment to table
COMMENT ON TABLE quote_submissions IS 'Stores quote request submissions from the Pinkys Up marketing site';
