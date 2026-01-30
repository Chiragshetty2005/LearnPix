'use server'

import { createAdminClient } from "@/utils/supabase/admin";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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

    // Placeholder for actual generation logic or API call
    console.log(`Generating video for series ${seriesId}...`);

    // For now, we update status to 'processing'
    const supabase = createAdminClient();
    await supabase
        .from('video_series')
        .update({ status: 'processing' })
        .eq('id', seriesId)
        .eq('user_id', userId);

    revalidatePath('/dashboard');
}
