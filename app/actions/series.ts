'use server'

import { createAdminClient } from "@/utils/supabase/admin";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { inngest } from "@/inngest/client";

export async function deleteSeries(seriesId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = createAdminClient();
    const { error } = await supabase
        .from('video_series')
        .delete()
        .eq('id', seriesId)
        .eq('user_id', userId); // Ensure ownership

    if (error) throw new Error(error.message);
    revalidatePath('/dashboard');
}

export async function updateSeriesStatus(seriesId: string, newStatus: string) {
    const { userId } = await auth();
    console.log("[updateSeriesStatus] userId:", userId);

    if (!userId) {
        console.error("[updateSeriesStatus] No userId found in session");
        throw new Error("Unauthorized");
    }

    const supabase = createAdminClient();
    const { error } = await supabase
        .from('video_series')
        .update({ status: newStatus })
        .eq('id', seriesId)
        .eq('user_id', userId);

    if (error) throw new Error(error.message);
    revalidatePath('/dashboard');
}

export async function generateSeriesVideo(seriesId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // 1. Create a placeholder record in generated_videos with status 'processing'
    const supabase = createAdminClient();
    const { data: videoRecord, error: insertError } = await supabase
        .from('generated_videos')
        .insert({
            series_id: seriesId,
            status: 'processing'
        })
        .select('id')
        .single();

    if (insertError) throw new Error("Failed to create video record: " + insertError.message);

    const generatedVideoId = videoRecord.id;

    // 2. Trigger Inngest Workflow
    await inngest.send({
        name: "video/generate",
        data: {
            seriesId: seriesId,
            userId: userId,
            generatedVideoId: generatedVideoId // Pass the ID so we update this specific record later
        }
    });

    // 3. Update status to processing (optional, keeps old logic consistent)
    await supabase
        .from('video_series')
        .update({ status: 'processing' })
        .eq('id', seriesId)
        .eq('user_id', userId);

    revalidatePath('/dashboard');
}
