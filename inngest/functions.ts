import { inngest } from "./client";
import { createAdminClient } from "@/utils/supabase/admin";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { event, body: "Hello, World!" };
    }
);

export const generateVideo = inngest.createFunction(
    { id: "generate-video" },
    { event: "video/generate" },
    async ({ event, step }) => {
        const { seriesId, userId } = event.data;

        // 1. Fetch Series data from supabase
        const series = await step.run("fetch-series-data", async () => {
            const supabase = createAdminClient();
            const { data, error } = await supabase
                .from('video_series')
                .select('*')
                .eq('id', seriesId)
                .single();

            if (error) throw new Error(error.message);
            return data;
        });

        // 2. Generate Video Script using AI
        const scriptData = await step.run("generate-script", async () => {
            const apiKey = process.env.GROQ_API_KEY;

            if (!apiKey) throw new Error("Missing GROQ_API_KEY");

            const Groq = require("groq-sdk");
            const groq = new Groq({ apiKey });

            const prompt = `
            You are an AI video script writer.
            Create a video script for a video series with the following details:
            - Niche: ${series.niche}
            - Video Style: ${series.video_style}
            - Duration: ${series.duration}
            - Series Name: ${series.series_name}

            Requirements:
            - Generate a natural, engaging voiceover script.
            - If duration is 30-40 seconds, generate 4-5 image prompts.
            - If duration is 60-70 seconds, generate 5-6 image prompts.
            - Provide a catchy Video Title.
            - Return the result strictly in the following JSON format:
            {
              "video_title": "string",
              "script": [
                {
                  "scene_number": number,
                  "voiceover": "string",
                  "image_prompt": "string" 
                }
              ]
            }
            Do not include any raw text or markdown formatting outside the JSON object.
            `;

            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                model: "llama-3.3-70b-versatile",
            });

            const content = completion.choices[0]?.message?.content || "{}";

            // basic cleanup if model adds markdown blocks
            const jsonStr = content.replace(/```json|```/g, '').trim();
            return JSON.parse(jsonStr);
        });

        // 3. Generate Voice using TTS model
        const voiceScript = await step.run("generate-voice", async () => {
            const fonadaApiKey = process.env.FONADA_API_KEY;
            const deepgramApiKey = process.env.DEEPGRAM_API_KEY;

            // Allow proceed if at least one key is present, but warn if missing based on intended usage
            if (!fonadaApiKey && !deepgramApiKey) throw new Error("Missing TTS API Keys (FONADA_API_KEY or DEEPGRAM_API_KEY)");

            const supabase = createAdminClient();

            const updatedScript = await Promise.all(scriptData.script.map(async (scene: any, index: number) => {
                try {
                    let audioBuffer: Buffer;

                    // Simple logic: Use Deepgram for English/Global, Fonada for others (Indian context)
                    // FALLBACK: Fonada seems down (ENOTFOUND), so defaulting everything to Deepgram for now.
                    const isGlobalLanguage = true; // Force Deepgram: series.language?.toLowerCase().includes("english");

                    if ((isGlobalLanguage || !fonadaApiKey) && deepgramApiKey) {
                        // --- DEEPGRAM (Global) ---
                        const response = await fetch("https://api.deepgram.com/v1/speak?model=aura-asteria-en", {
                            method: "POST",
                            headers: {
                                "Authorization": `Token ${deepgramApiKey}`,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                text: scene.voiceover
                            })
                        });

                        if (!response.ok) {
                            const errText = await response.text();
                            throw new Error(`Deepgram API Error (${response.status}): ${errText}`);
                        }
                        const arrayBuffer = await response.arrayBuffer();
                        audioBuffer = Buffer.from(arrayBuffer);

                    } else if (fonadaApiKey) {
                        // --- FONADA (Indian/Default) ---
                        // ... code ...
                        // --- FONADA (Indian/Default) ---
                        const response = await fetch("https://api.fonadalabs.ai/v1/tts/synthesize", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${fonadaApiKey}`
                            },
                            body: JSON.stringify({
                                text: scene.voiceover,
                                voice: "english-us-female", // Placeholder, ideally mapped from series.language
                                format: "mp3",
                                speed: 1.0
                            })
                        });

                        if (!response.ok) {
                            const errText = await response.text();
                            throw new Error(`Fonada API Error (${response.status}): ${errText}`);
                        }
                        const arrayBuffer = await response.arrayBuffer();
                        audioBuffer = Buffer.from(arrayBuffer);

                    } else {
                        throw new Error("No suitable TTS API Key available for the selected language.");
                    }

                    // 2. Upload to Supabase Storage
                    const fileName = `${seriesId}/scene_${scene.scene_number}_${Date.now()}.mp3`;
                    const { error: uploadError } = await supabase
                        .storage
                        .from('audio')
                        .upload(fileName, audioBuffer, {
                            contentType: 'audio/mpeg',
                            upsert: true
                        });

                    if (uploadError) throw new Error(`Supabase Upload Error: ${uploadError.message}`);

                    // 3. Get Public URL
                    const { data: { publicUrl } } = supabase.storage.from('audio').getPublicUrl(fileName);

                    return {
                        ...scene,
                        audio_url: publicUrl
                    };

                } catch (err: any) {
                    console.error(`Audio generation failed for scene ${scene.scene_number}:`, err);
                    throw err;
                }
            }));

            return updatedScript;
        });

        // 4. Generate Caption using Model
        const captionedScript = await step.run("generate-captions", async () => {
            const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
            if (!deepgramApiKey) throw new Error("Missing DEEPGRAM_API_KEY for captions");

            const updatedScript = await Promise.all(voiceScript.map(async (scene: any) => {
                try {
                    if (!scene.audio_url) return scene; // Skip if no audio

                    const response = await fetch("https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&punctuate=true", {
                        method: "POST",
                        headers: {
                            "Authorization": `Token ${deepgramApiKey}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            url: scene.audio_url
                        })
                    });

                    if (!response.ok) {
                        const errText = await response.text();
                        throw new Error(`Deepgram STT Error (${response.status}): ${errText}`);
                    }

                    const data = await response.json();
                    // Deepgram structure: results.channels[0].alternatives[0].words
                    const captions = data.results?.channels[0]?.alternatives[0]?.words || [];

                    return {
                        ...scene,
                        captions: captions // Array of { word, start, end, confidence, ... }
                    };

                } catch (err) {
                    console.error(`Caption generation failed for scene ${scene.scene_number}:`, err);
                    // Return scene without captions rather than failing entire workflow
                    return { ...scene, caption_error: (err as Error).message };
                }
            }));

            return updatedScript;
        });

        // 5. Generate Images from image prompt generated data from step 2
        const imageUrls = await step.run("generate-images", async () => {
            const replicateApiToken = process.env.REPLICATE_API_TOKEN;
            if (!replicateApiToken) throw new Error("Missing REPLICATE_API_TOKEN");

            const Replicate = require("replicate");
            const replicate = new Replicate({ auth: replicateApiToken });
            const supabase = createAdminClient();

            const updatedScript = [];

            for (const [index, scene] of captionedScript.entries()) {
                const s = scene as any;
                try {
                    const prompt = s.image_prompt;
                    if (!prompt) {
                        updatedScript.push(s);
                        continue;
                    }

                    // RATE LIMITING: Add delay between requests (except first) to avoid 429
                    if (index > 0) {
                        console.log("Waiting 10s to respect Replicate rate limit...");
                        await new Promise(resolve => setTimeout(resolve, 10000));
                    }

                    // 1. Generate Image with Replicate (Google Imagen 4)
                    console.log(`Generating image for scene ${s.scene_number} with prompt: ${prompt.substring(0, 50)}...`);

                    const output: any = await replicate.run(
                        "google/imagen-4",
                        {
                            input: {
                                prompt: prompt,
                                aspect_ratio: "9:16", // Vertical for shorts
                                safety_filter_level: "block_medium_and_above"
                            }
                        }
                    );

                    console.log("Replicate Output Type:", typeof output);
                    console.log("Replicate Output keys:", output ? Object.keys(output) : "null");
                    // console.log("Raw Output:", output); 

                    // Output parsing logic
                    let imageUrl: string;
                    if (typeof output === 'string') {
                        imageUrl = output;
                    } else if (Array.isArray(output) && output.length > 0) {
                        imageUrl = output[0];
                    } else if (output && typeof output.url === 'function') {
                        imageUrl = output.url();
                    } else if (output && output instanceof ReadableStream) {
                        // Handle stream if possible, or just log error for now
                        console.log("Output is ReadableStream. User snippet suggested .url() but maybe it's not available?");
                        imageUrl = String(output); // Fallback
                    } else {
                        // Fallback: try to see if output itself is a stream readable, or cast to string
                        imageUrl = String(output);
                    }

                    console.log("Resolved Image URL:", imageUrl);

                    // 2. Download Image
                    const imageResponse = await fetch(imageUrl);
                    if (!imageResponse.ok) throw new Error("Failed to download generated image from Replicate");
                    const imageBuffer = await imageResponse.arrayBuffer();

                    // 3. Upload to Supabase
                    const fileName = `${seriesId}/scene_${s.scene_number}_${Date.now()}.png`;
                    const { error: uploadError } = await supabase
                        .storage
                        .from('images')
                        .upload(fileName, imageBuffer, {
                            contentType: 'image/png',
                            upsert: true
                        });

                    if (uploadError) throw new Error(`Supabase Image Upload Error: ${uploadError.message}`);

                    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);

                    updatedScript.push({
                        ...s,
                        image_url: publicUrl
                    });

                } catch (err: any) {
                    console.error(`Image generation failed for scene ${s.scene_number}:`, err);
                    updatedScript.push({ ...s, image_error: err.message });
                }
            }

            return updatedScript;
        });

        // 6. Save everything to database
        const videoData = await step.run("save-video-data", async () => {
            const supabase = createAdminClient();

            // Extract just the image URLs for the dedicated column
            const allImageUrls = imageUrls.map((s: any) => s.image_url).filter(Boolean);

            // 1. Update the existing generated_videos record
            // If generatedVideoId exists (new flow), update it.
            // If not (legacy flow compat), insert new.
            const generatedVideoId = event.data.generatedVideoId;

            if (generatedVideoId) {
                const { error: updateError } = await supabase
                    .from('generated_videos')
                    .update({
                        status: 'completed',
                        script_data: imageUrls,
                        image_urls: allImageUrls
                    })
                    .eq('id', generatedVideoId);

                if (updateError) throw new Error("Failed to update generated video: " + updateError.message);
            } else {
                // Fallback for older triggers or if ID missing
                const { error: insertError } = await supabase
                    .from('generated_videos')
                    .insert({
                        series_id: seriesId,
                        status: 'completed',
                        script_data: imageUrls,
                        image_urls: allImageUrls
                    });
                if (insertError) throw new Error("Failed to insert generated video: " + insertError.message);
            }

            // 2. Update parent series status (optional, but good for UI to know something happened)
            const { error: updateError } = await supabase
                .from('video_series')
                .update({
                    status: 'completed',
                    // We don't save script_data here anymore, it's in the child table
                })
                .eq('id', seriesId);

            if (updateError) throw new Error("Failed to update series status: " + updateError.message);

            return { success: true, seriesId };
        });

        return { success: true, seriesId, videoData };
    }
);
