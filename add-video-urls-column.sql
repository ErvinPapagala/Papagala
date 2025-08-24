-- Add video_urls column to existing parrots table
ALTER TABLE public.parrots 
ADD COLUMN video_urls TEXT[] DEFAULT '{}';

-- Add comment for documentation
COMMENT ON COLUMN public.parrots.video_urls IS 'Array of video URLs for the parrot gallery';