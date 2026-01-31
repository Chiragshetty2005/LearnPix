-- Run this in your Supabase SQL Editor
ALTER TABLE video_series ADD COLUMN IF NOT EXISTS script_data JSONB;
