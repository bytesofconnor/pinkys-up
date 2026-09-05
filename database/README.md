# Database Setup

This directory contains the database schema and setup instructions for the Pinkys Up quote submission system.

## Prerequisites

- A Supabase account (free tier is sufficient)
- Supabase project created at [supabase.com](https://supabase.com)

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in your project details:
   - Name: `pinkys-up` (or any name you prefer)
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
   - Pricing Plan: Free (suitable for this use case)

### 2. Run the Database Schema

1. In your Supabase dashboard, click on "SQL Editor" in the left sidebar
2. Click "New query"
3. Copy the contents of `schema.sql` and paste it into the editor
4. Click "Run" to execute the SQL

This will create:
- The `quote_submissions` table
- Indexes for efficient queries
- Row Level Security (RLS) policies

### 3. Get Your Supabase Credentials

1. In your Supabase dashboard, go to "Project Settings" → "API"
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **service_role key** (found under "Project API keys" - this is the secret key)

### 4. Configure Environment Variables

Add these to your `.env` file:

```bash
# Supabase Configuration
SUPABASE_URL=your_project_url_here
SUPABASE_SERVICE_KEY=your_service_role_key_here

# Admin Access
ADMIN_TOKEN=choose_a_secure_random_token_here
```

**Important Security Notes:**
- Never commit your `.env` file to Git
- The `SUPABASE_SERVICE_KEY` bypasses Row Level Security - keep it secret
- The `ADMIN_TOKEN` is used to access the admin quotes page - choose a long random string

### 5. Accessing the Admin Page

Once deployed, you can view quote submissions at:

```
https://your-domain.com/admin/quotes?token=YOUR_ADMIN_TOKEN
```

Replace `YOUR_ADMIN_TOKEN` with the value you set in your environment variables.

## Data Model

The `quote_submissions` table stores the following information:

- `id` (UUID) - Unique identifier
- `created_at` (timestamp) - When the quote was submitted
- `first_name`, `last_name` - Customer name
- `email`, `phone` - Contact information
- `services` (array) - Selected services (bar, mixologist, glassware, custom, dj)
- `event_type` - Type of event
- `event_date` - When the event is scheduled
- `location` - Event location
- `guest_count` - Number of guests
- `referral_source` - How they heard about Pinkys Up
- `additional_details` - Any extra notes
- `email_sent` (boolean) - Whether the notification email was sent successfully
- `email_error` (text) - Error message if email failed

## Failure Modes

The system is designed to handle failures gracefully:

1. **Email fails, Database succeeds**: Quote is saved and can be retrieved from admin page. A warning is logged.
2. **Database fails, Email succeeds**: Email is sent to Brenda. A warning is logged.
3. **Both succeed**: Normal operation.
4. **Both fail**: User sees an error message and can try again.

This ensures no quote submissions are lost due to a single point of failure.

## Querying the Database

You can query the database directly in the Supabase SQL Editor:

```sql
-- Get all quotes from the last 7 days
SELECT * FROM quote_submissions
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Count quotes by service
SELECT 
  UNNEST(services) as service,
  COUNT(*) as count
FROM quote_submissions
GROUP BY service
ORDER BY count DESC;

-- Find quotes where email failed
SELECT * FROM quote_submissions
WHERE email_sent = false
ORDER BY created_at DESC;
```

## Maintenance

### Backup

Supabase automatically backs up your database. You can also:
- Download backups from the Supabase dashboard
- Set up scheduled backups to external storage

### Monitoring

- Check the Supabase dashboard for query performance
- Monitor the logs in the "Logs" section
- Set up email alerts for critical issues

## Troubleshooting

### "Supabase configuration missing" error

Make sure `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are set in your environment variables.

### Can't access admin page

1. Verify `ADMIN_TOKEN` is set in your environment variables
2. Make sure you're using the correct token in the URL: `/admin/quotes?token=YOUR_TOKEN`
3. Check that your deployment platform has the environment variables configured

### Quotes not saving to database

1. Check the Supabase dashboard logs for errors
2. Verify the schema was created correctly
3. Ensure the service role key has not been revoked
4. Check the Next.js server logs for error messages

## Local Development

For local development:

1. You can use the same Supabase project (recommended for simplicity)
2. Or create a separate "development" project in Supabase
3. Make sure your `.env` file is configured correctly
4. The database client will automatically connect when you run `npm run dev`
