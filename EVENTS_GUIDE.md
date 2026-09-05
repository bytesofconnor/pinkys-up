# 📅 How to Update Community Events

This guide explains how to add, edit, or remove community wellness events on the Pinkys Up website **without needing an engineer**.

## Quick Overview

All event data is stored in a single file: **`data/events.json`**

When you edit this file and push your changes to GitHub, the website automatically updates with your new event information.

---

## Step-by-Step Instructions

### 1. Open the Events File

1. Go to the GitHub repository: [https://github.com/cbarrett3/pinkys-up](https://github.com/cbarrett3/pinkys-up)
2. Navigate to the `data` folder
3. Click on `events.json`
4. Click the **pencil icon** (✏️) in the top right to edit

### 2. Understanding the Event Format

Each event in the file looks like this:

```json
{
  "id": "community-wellness-october",
  "name": "Community Wellness Experience",
  "description": "A welcoming morning to move, connect, and explore what feeling good looks like together.",
  "startsAt": "2026-10-18T10:00:00-05:00",
  "location": "Minneapolis, MN",
  "timeZone": "America/Chicago",
  "registrationUrl": null
}
```

#### Field Explanations:

- **`id`**: A unique identifier (use lowercase with dashes, no spaces)
  - Example: `"community-wellness-october"`

- **`name`**: The event title (shows on the website)
  - Example: `"Community Wellness Experience"`

- **`description`**: A short description of the event
  - Keep it to 1-2 sentences

- **`startsAt`**: The date and time in ISO 8601 format
  - Format: `"YYYY-MM-DDTHH:MM:SS-HH:MM"`
  - Example: `"2026-10-18T10:00:00-05:00"` (Oct 18, 2026 at 10:00 AM Central Time)
  - **For date TBD**: Leave this field out entirely or set to `null`

- **`location`**: Where the event takes place
  - Example: `"Minneapolis, MN"` or `"Washington, DC"`

- **`timeZone`**: The timezone for the event
  - Use: `"America/Chicago"` for Central Time
  - Use: `"America/New_York"` for Eastern Time

- **`registrationUrl`**: Link to external registration (like Eventbrite)
  - Use `null` for WhatsApp registration (default)
  - Or provide a URL like: `"https://eventbrite.com/your-event"`

---

## Common Tasks

### ✅ Adding a New Event

1. Find the last event in the file (before the closing `]`)
2. Add a comma after the last `}`
3. Copy an existing event and paste it below
4. Update all the fields with your new event information
5. Make sure each field is properly formatted (with quotes and commas)

**Example:**

```json
[
  {
    "id": "existing-event",
    "name": "Existing Event",
    ...
  },
  {
    "id": "new-event-january",
    "name": "New Year Wellness Kickoff",
    "description": "Start the year with intention and community connection.",
    "startsAt": "2027-01-15T11:00:00-05:00",
    "location": "Washington, DC",
    "timeZone": "America/New_York",
    "registrationUrl": null
  }
]
```

### ✏️ Editing an Existing Event

1. Find the event you want to edit (look for the `id` or `name`)
2. Change the field values you need to update
3. Make sure to keep the quotes and commas in place

### ❌ Removing an Event

1. Find the event you want to remove
2. Delete the entire event block (from `{` to `}`)
3. Remove any extra commas if needed
4. Make sure the file still has valid JSON formatting

**Example - Before:**
```json
[
  { "id": "event-1", ... },
  { "id": "event-2", ... },
  { "id": "event-3", ... }
]
```

**Example - After (removing event-2):**
```json
[
  { "id": "event-1", ... },
  { "id": "event-3", ... }
]
```

---

## Date & Time Formatting

### Format Breakdown: `"2026-10-18T10:00:00-05:00"`

- `2026-10-18` = October 18, 2026
- `T` = Separator (always include)
- `10:00:00` = 10:00 AM (use 24-hour format: 14:00:00 for 2 PM)
- `-05:00` = Central Time offset (use `-05:00` for CST or `-06:00` for CDT)
- For Eastern Time: use `-05:00` (EST) or `-04:00` (EDT)

### Quick Reference:

| Time | 24-Hour Format |
|------|----------------|
| 9 AM | 09:00:00 |
| 10 AM | 10:00:00 |
| 12 PM (noon) | 12:00:00 |
| 2 PM | 14:00:00 |
| 5 PM | 17:00:00 |
| 7 PM | 19:00:00 |

---

## WhatsApp vs External Registration

### WhatsApp Registration (Default)

When `registrationUrl` is `null`, visitors click "Register via WhatsApp" and are taken to a pre-filled WhatsApp message.

**Example:**
```json
"registrationUrl": null
```

### External Registration Link

If you have an Eventbrite, Luma, or other registration page:

**Example:**
```json
"registrationUrl": "https://www.eventbrite.com/e/your-event-123456"
```

---

## Publishing Your Changes

### On GitHub.com (Web Interface)

1. After editing `data/events.json`, scroll down to "Commit changes"
2. Add a commit message like: `"Update events for January"`
3. Choose **"Commit directly to the main branch"** (production branch)
4. Click **"Commit changes"**

**The website will automatically rebuild and update within 2-3 minutes!**

### Using GitHub Desktop (Optional)

1. Open GitHub Desktop
2. You'll see your changes to `data/events.json`
3. Write a commit message in the bottom left
4. Click **"Commit to main"**
5. Click **"Push origin"** to publish

---

## Troubleshooting

### ❗ "Invalid JSON" Error

This means there's a formatting issue. Common problems:

1. **Missing comma** between events
   ```json
   { "id": "event-1" }  ← Missing comma here
   { "id": "event-2" }
   ```
   **Fix:** Add a comma after the first event's closing `}`

2. **Extra comma** after the last event
   ```json
   { "id": "event-3" },  ← Remove this comma
   ]
   ```

3. **Missing quotes** around text
   ```json
   "name": Community Event  ← Missing quotes
   ```
   **Fix:** `"name": "Community Event"`

4. **Missing closing bracket or brace**
   - Make sure every `{` has a matching `}`
   - Make sure the file starts with `[` and ends with `]`

### 🔍 Validation Tool

You can paste your JSON into [JSONLint](https://jsonlint.com/) to check for errors before committing.

---

## Example: Complete Events File

```json
[
  {
    "id": "community-wellness-october",
    "name": "Community Wellness Experience",
    "description": "A welcoming morning to move, connect, and explore what feeling good looks like together.",
    "startsAt": "2026-10-18T10:00:00-05:00",
    "location": "Minneapolis, MN",
    "timeZone": "America/Chicago",
    "registrationUrl": null
  },
  {
    "id": "movement-connection-november",
    "name": "Movement & Connection",
    "description": "Gentle mobility, community, and intentional self-care in an accessible space.",
    "startsAt": "2026-11-15T10:00:00-05:00",
    "location": "Washington, DC",
    "timeZone": "America/New_York",
    "registrationUrl": null
  },
  {
    "id": "celebration-social-december",
    "name": "Celebration & Wellness Social",
    "description": "A zero-proof community gathering to close the season with connection and joy.",
    "startsAt": "2026-12-13T15:00:00-06:00",
    "location": "Minneapolis, MN",
    "timeZone": "America/Chicago",
    "registrationUrl": null
  }
]
```

---

## Need Help?

If you run into issues or have questions:

1. Check that your JSON is valid using [JSONLint](https://jsonlint.com/)
2. Compare your formatting to the examples above
3. Reach out to Connor for technical support

---

**Happy Event Planning! 🍹**
