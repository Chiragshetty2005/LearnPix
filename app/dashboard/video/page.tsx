import { createAdminClient } from "@/utils/supabase/admin";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Play, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function VideoPage() {
    const user = await currentUser();
    if (!user) {
        redirect("/sign-in");
    }

    const supabase = createAdminClient();

    // 2. Fetch Generated Videos for this user
    // We need to join with video_series to filter by user_id
    const { data: videos, error } = await supabase
        .from('generated_videos')
        .select(`
            id,
            status,
            created_at,
            image_urls,
            series_id,
            script_data,
            video_series!inner (
                user_id,
                series_name
            )
        `)
        .eq('video_series.user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching videos:", error);
        return <div>Error loading videos.</div>;
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-zinc-900 mb-8">Your Generated Videos</h1>

            {videos.length === 0 ? (
                <div className="text-center py-20 bg-zinc-50 rounded-xl border border-dashed border-zinc-300">
                    <p className="text-zinc-500 mb-4">No videos generated yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video: any) => {
                        // Determine thumbnail
                        let thumbnail = "/video-placeholder.png";
                        if (video.image_urls && video.image_urls.length > 0) {
                            thumbnail = video.image_urls[0];
                        } else if (video.script_data && Array.isArray(video.script_data)) {
                            // Fallback to script_data inspection if image_urls column is empty (old data)
                            const firstScene = video.script_data.find((s: any) => s.image_url);
                            if (firstScene) thumbnail = firstScene.image_url;
                        }

                        // Determine Title
                        const title = video.script_data?.video_title || video.video_series?.series_name || "Untitled Video";

                        return (
                            <Card key={video.id} className="overflow-hidden group hover:shadow-lg transition-all border-zinc-200">
                                {/* Thumbnail Area */}
                                <div className="relative aspect-[9/16] bg-zinc-900">
                                    {video.status === 'processing' ? (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/80 z-10">
                                            <Loader2 className="w-8 h-8 animate-spin mb-2 text-blue-500" />
                                            <span className="text-sm font-medium">Generating...</span>
                                        </div>
                                    ) : null}

                                    <Image
                                        src={thumbnail}
                                        alt={title}
                                        fill
                                        className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                    />

                                    {/* Play Overlay */}
                                    {video.status === 'completed' && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                                                <Play className="w-5 h-5 text-zinc-900 ml-1" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-zinc-900 line-clamp-1" title={title}>
                                        {title}
                                    </h3>
                                    <div className="flex justify-between items-center mt-2 text-xs text-zinc-500">
                                        <span>{video.video_series?.series_name}</span>
                                        <span>{formatDistanceToNow(new Date(video.created_at), { addSuffix: true })}</span>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
