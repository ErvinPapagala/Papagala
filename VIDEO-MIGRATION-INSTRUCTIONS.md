# Database Migration Required

## Error: video_urls column missing

The admin panel is trying to save `video_urls` but this column doesn't exist in your Supabase database yet.

## How to fix:

1. **Go to your Supabase dashboard**
2. **Open the SQL Editor**
3. **Run this SQL command:**

```sql
ALTER TABLE parrots 
ADD COLUMN video_urls TEXT[] DEFAULT '{}';
```

4. **Click "Run" to execute the migration**

## What this does:
- Adds a new `video_urls` column to the `parrots` table
- Sets it as an array of text (TEXT[])
- Sets default value to empty array ('{}')
- Allows storing multiple video URLs per parrot

## After running the migration:
- The admin panel will work properly
- You can upload and save videos for parrots
- Videos will display on parrot detail pages
- No data will be lost

## Alternative: Temporary fix
If you can't run the migration right now, I can modify the code to not save video_urls until you add the column.