
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function initStorage() {
    console.log('Checking storage buckets...');
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
        console.error('Error listing buckets:', error.message);
        return;
    }

    const audioBucket = buckets.find(b => b.name === 'audio');

    if (audioBucket) {
        console.log("'audio' bucket already exists.");
    } else {
        console.log("Creating 'audio' bucket...");
        const { data, error: createError } = await supabase.storage.createBucket('audio', {
            public: true,
            fileSizeLimit: 10485760, // 10MB
            allowedMimeTypes: ['audio/mpeg', 'audio/wav', 'audio/mp3']
        });

        if (createError) {
            console.error('Error creating bucket:', createError.message);
        } else {
            console.log("'audio' bucket created successfully!");
        }
    }

    const imagesBucket = buckets.find(b => b.name === 'images');

    if (imagesBucket) {
        console.log("'images' bucket already exists.");
    } else {
        console.log("Creating 'images' bucket...");
        const { data, error: createError } = await supabase.storage.createBucket('images', {
            public: true,
            fileSizeLimit: 10485760, // 10MB
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp']
        });

        if (createError) {
            console.error('Error creating images bucket:', createError.message);
        } else {
            console.log("'images' bucket created successfully!");
        }
    }
}

initStorage();
