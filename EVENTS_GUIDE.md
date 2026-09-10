# How to add and update events

Brenda can manage community events from the website — no GitHub, no JSON.

1. Go to [pinkysup.social/admin](https://www.pinkysup.social/admin)
2. Enter the access code (`ADMIN_TOKEN`)
3. Open **Events** → **Add event**
4. Fill in the name, description, city, and date (or leave the date as TBD)
5. Leave the registration link blank to use WhatsApp RSVP, or paste Eventbrite
6. Save — the homepage and Events page update immediately

Edit or delete any event from the same list. Uncheck **Show on the website** to hide something without deleting it.

Quotes live next to events under **Quotes**.

## One-time setup

If the admin says the events table is missing, run `database/events.sql` in the Supabase SQL editor, then refresh.
