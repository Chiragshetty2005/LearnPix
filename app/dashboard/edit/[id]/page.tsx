import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { CreateWizard } from "@/components/create/create-wizard";
import { redirect } from "next/navigation";

interface EditSeriesPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditSeriesPage({ params }: EditSeriesPageProps) {
    const { userId } = await auth();
    if (!userId) redirect('/sign-in');

    const { id } = await params;

    const supabase = createAdminClient();
    const { data: series, error } = await supabase
        .from('video_series')
        .select('*')
        .eq('id', id)
        .eq('user_id', userId)
        .single();

    if (error || !series) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-zinc-500">
                <h2 className="text-xl font-semibold text-zinc-900 mb-2">Series Not Found</h2>
                <p>could not load the requested series.</p>
            </div>
        );
    }

    // Map database fields to wizard form data structure if necessary
    // Currently they are mostly 1:1 match based on previous implementation
    const initialData = {
        niche: series.niche,
        nicheType: series.niche === 'Custom' ? 'custom' : 'available', // rudimentary check
        customNiche: series.niche === 'Custom' ? series.niche : undefined, // Check if this was stored properly
        language: typeof series.language === 'string' ? series.language : JSON.stringify(series.language), // Ensure simple format
        voice: series.voice,
        music: series.background_music,
        videoStyle: series.video_style,
        captionStyle: series.caption_style,
        seriesName: series.series_name,
        duration: series.duration,
        platforms: series.platforms,
        publishTime: series.publish_time,
    };

    return (
        <CreateWizard
            initialData={initialData}
            isEditMode={true}
            seriesId={id}
        />
    );
}
