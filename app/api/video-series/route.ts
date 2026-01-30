import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const {
            seriesName,
            niche,
            nicheValue, // Legacy support
            customNiche,
            language,
            voice,
            music,
            videoStyle,
            captionStyle,
            duration,
            platforms,
            publishTime
        } = body;

        // Basic validation
        if (!seriesName) {
            return new NextResponse("Series Name is required", { status: 400 });
        }

        const supabase = createAdminClient();

        const { data, error } = await supabase.from('video_series').insert({
            user_id: userId,
            series_name: seriesName,
            niche: (niche || nicheValue) === 'Custom' ? customNiche : (niche || nicheValue),
            language: typeof language === 'string' ? language : JSON.stringify(language), // Ensure string
            voice: typeof voice === 'string' ? voice : JSON.stringify(voice),
            background_music: music, // Assuming this is an array or object
            video_style: videoStyle,
            caption_style: captionStyle,
            duration: duration,
            platforms: platforms,
            publish_time: publishTime,
            status: 'active'
        }).select();

        if (error) {
            console.error("[VIDEO_SERIES_CREATE] Supabase Error:", error);
            return new NextResponse("Database Error: " + error.message, { status: 500 });
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error("[VIDEO_SERIES_CREATE] Internal Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const supabase = createAdminClient();
        const { data, error } = await supabase
            .from('video_series')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("[VIDEO_SERIES_GET] Supabase Error:", error);
            return new NextResponse("Database Error: " + error.message, { status: 500 });
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error("[VIDEO_SERIES_GET] Internal Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const {
            id,
            seriesName,
            niche,
            nicheValue,
            customNiche,
            language,
            voice,
            music,
            videoStyle,
            captionStyle,
            duration,
            platforms,
            publishTime
        } = body;

        if (!id) {
            return new NextResponse("Series ID is required", { status: 400 });
        }

        const supabase = createAdminClient();
        const { data, error } = await supabase.from('video_series').update({
            series_name: seriesName,
            niche: (niche || nicheValue) === 'Custom' ? customNiche : (niche || nicheValue),
            language: typeof language === 'string' ? language : JSON.stringify(language),
            voice: typeof voice === 'string' ? voice : JSON.stringify(voice),
            background_music: music,
            video_style: videoStyle,
            caption_style: captionStyle,
            duration: duration,
            platforms: platforms,
            publish_time: publishTime,
        })
            .eq('id', id)
            .eq('user_id', userId)
            .select();

        if (error) {
            console.error("[VIDEO_SERIES_UPDATE] Supabase Error:", error);
            return new NextResponse("Database Error: " + error.message, { status: 500 });
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error("[VIDEO_SERIES_UPDATE] Internal Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
