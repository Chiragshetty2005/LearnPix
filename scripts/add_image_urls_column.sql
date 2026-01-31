-- Run this in your Supabase SQL Editor
ALTER TABLE generated_videos ADD COLUMN IF NOT EXISTS image_urls TEXT[];
