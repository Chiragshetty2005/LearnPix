-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS generated_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  series_id UUID NOT NULL REFERENCES video_series(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'processing',
  script_data JSONB,
  video_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Optional depending on your setup, generally good practice)
ALTER TABLE generated_videos ENABLE ROW LEVEL SECURITY;

-- Allow read access
CREATE POLICY "Enable read access for all users" ON generated_videos
    FOR SELECT USING (true);

-- Allow insert/update (You might want to restrict this to service role in prod)
CREATE POLICY "Enable insert for all users" ON generated_videos
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON generated_videos
    FOR UPDATE USING (true);
