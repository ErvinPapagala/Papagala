-- Add additional columns to parrots table for detailed information
-- Run this in your Supabase SQL editor

ALTER TABLE parrots 
ADD COLUMN IF NOT EXISTS weight_grams INTEGER,
ADD COLUMN IF NOT EXISTS color TEXT,
ADD COLUMN IF NOT EXISTS temperament TEXT,
ADD COLUMN IF NOT EXISTS health_status TEXT DEFAULT 'healthy',
ADD COLUMN IF NOT EXISTS training_level TEXT DEFAULT 'basic',
ADD COLUMN IF NOT EXISTS can_talk BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_hand_fed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS has_health_certificate BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS has_breeding_certificate BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS has_cites_permit BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS has_microchip BOOLEAN DEFAULT FALSE;

-- Add comments for documentation
COMMENT ON COLUMN parrots.weight_grams IS 'Weight of the parrot in grams';
COMMENT ON COLUMN parrots.color IS 'Primary color of the parrot';
COMMENT ON COLUMN parrots.temperament IS 'Temperament/personality of the parrot';
COMMENT ON COLUMN parrots.health_status IS 'Health status: healthy, checked, vaccinated, certified';
COMMENT ON COLUMN parrots.training_level IS 'Training level: none, basic, intermediate, advanced';
COMMENT ON COLUMN parrots.can_talk IS 'Whether the parrot can talk';
COMMENT ON COLUMN parrots.is_hand_fed IS 'Whether the parrot was hand-fed';
COMMENT ON COLUMN parrots.has_health_certificate IS 'Whether the parrot has health certificate';
COMMENT ON COLUMN parrots.has_breeding_certificate IS 'Whether the parrot has breeding certificate';
COMMENT ON COLUMN parrots.has_cites_permit IS 'Whether the parrot has CITES permit';
COMMENT ON COLUMN parrots.has_microchip IS 'Whether the parrot has microchip identification';