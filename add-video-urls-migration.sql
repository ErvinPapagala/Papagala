-- Add video_urls column to parrots table
-- Run this in your Supabase SQL editor

ALTER TABLE parrots 
ADD COLUMN video_urls TEXT[] DEFAULT '{}';

-- Add comment for documentation
COMMENT ON COLUMN parrots.video_urls IS 'Array of video URLs for the parrot gallery';