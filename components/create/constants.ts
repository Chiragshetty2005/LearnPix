export const Languages = [
    {
        "language": "English",
        "countryCode": "US",
        "countryFlag": "🇺🇸",
        "modelName": "deepgram",
        "modelLangCode": "en-US"
    },
    {
        "language": "Spanish",
        "countryCode": "MX",
        "countryFlag": "🇲🇽",
        "modelName": "deepgram",
        "modelLangCode": "es-MX"
    },
    {
        "language": "German",
        "countryCode": "DE",
        "countryFlag": "🇩🇪",
        "modelName": "deepgram",
        "modelLangCode": "de-DE"
    },
    {
        "language": "Hindi",
        "countryCode": "IN",
        "countryFlag": "🇮🇳",
        "modelName": "fonadalab",
        "modelLangCode": "hi-IN"
    },
    {
        "language": "Marathi",
        "countryCode": "IN",
        "countryFlag": "🇮🇳",
        "modelName": "fonadalab",
        "modelLangCode": "mr-IN"
    },
    {
        "language": "Telugu",
        "countryCode": "IN",
        "countryFlag": "🇮🇳",
        "modelName": "fonadalab",
        "modelLangCode": "te-IN"
    },
    {
        "language": "Tamil",
        "countryCode": "IN",
        "countryFlag": "🇮🇳",
        "modelName": "fonadalab",
        "modelLangCode": "ta-IN"
    },
    {
        "language": "French",
        "countryCode": "FR",
        "countryFlag": "🇫🇷",
        "modelName": "deepgram",
        "modelLangCode": "fr-FR"
    },
    {
        "language": "Dutch",
        "countryCode": "NL",
        "countryFlag": "🇳🇱",
        "modelName": "deepgram",
        "modelLangCode": "nl-NL"
    },
    {
        "language": "Italian",
        "countryCode": "IT",
        "countryFlag": "🇮🇹",
        "modelName": "deepgram",
        "modelLangCode": "it-IT"
    },
    {
        "language": "Japanese",
        "countryCode": "JP",
        "countryFlag": "🇯🇵",
        "modelName": "deepgram",
        "modelLangCode": "ja-JP"
    }
];

export const DeepgramVoices = [
    {
        "model": "deepgram",
        "modelName": "aura-2-odysseus-en",
        "preview": "deepgram-aura-2-odysseus-en.wav",
        "gender": "male"
    },
    {
        "model": "deepgram",
        "modelName": "aura-2-thalia-en",
        "preview": "deepgram-aura-2-thalia-en.wav",
        "gender": "female"
    },
    {
        "model": "deepgram",
        "modelName": "aura-2-amalthea-en",
        "preview": "deepgram-aura-2-amalthea-en.wav",
        "gender": "female"
    },
    {
        "model": "deepgram",
        "modelName": "aura-2-andromeda-en",
        "preview": "deepgram-aura-2-andromeda-en.wav",
        "gender": "female"
    },
    {
        "model": "deepgram",
        "modelName": "aura-2-apollo-en",
        "preview": "deepgram-aura-2-apollo-en.wav",
        "gender": "male"
    }
];

export const FonadalabVoices = [
    {
        "model": "fonadalab",
        "modelName": "vaanee",
        "preview": "fonadalab-Vaanee.mp3",
        "gender": "female"
    },
    {
        "model": "fonadalab",
        "modelName": "chaitra",
        "preview": "fonadalab-Chaitra.mp3",
        "gender": "female"
    },
    {
        "model": "fonadalab",
        "modelName": "meghra",
        "preview": "fonadalab-Meghra.mp3",
        "gender": "female"
    },
    {
        "model": "fonadalab",
        "modelName": "nirvani",
        "preview": "fonadalab-Nirvani.mp3",
        "gender": "female"
    }
];

export const BackgroundMusic = [
    { name: "Trending Reel", url: "https://ik.imagekit.io/Tubeguruji/BgMusic/trending-instagram-reels-music-447249.mp3" },
    { name: "Marketing Inspiration", url: "https://ik.imagekit.io/Tubeguruji/BgMusic/instagram-reels-marketing-music-384448.mp3" },
    { name: "High Energy Sports", url: "https://ik.imagekit.io/Tubeguruji/BgMusic/basketball-instagram-reels-music-461852.mp3" },
    { name: "Dramatic Hip Hop", url: "https://ik.imagekit.io/Tubeguruji/BgMusic/dramatic-hip-hop-music-background-jazz-music-for-short-video-148505.mp3" },
    { name: "Corporate Upbeat", url: "https://ik.imagekit.io/Tubeguruji/BgMusic/instagram-reels-marketing-music-469052.mp3" },
];

export const VideoStyles = [
    { name: "Realistic", image: "/video-style/realistic.png" },
    { name: "Cartoon", image: "/video-style/3d-render.png" }, // Assuming 3d-render fits cartoon/3d
    { name: "Anime", image: "/video-style/anime.png" },
    { name: "Cinematic", image: "/video-style/cinematic.png" },
    { name: "Cyberpunk", image: "/video-style/cyberpunk.png" },
    { name: "GTA Style", image: "/video-style/gta.png" },
];

export const VideoDurations = [
    "30-50 sec",
    "60-70 sec"
];

import { Youtube, Instagram, Mail, GraduationCap } from "lucide-react";

export const Platforms = [
    { name: "LearnPix", icon: GraduationCap },
    { name: "Youtube", icon: Youtube },
    { name: "Instagram", icon: Instagram },
    { name: "Email", icon: Mail }
];

export const getAllVoices = (model: string) => {
    if (model === 'deepgram') return DeepgramVoices;
    if (model === 'fonadalab') return FonadalabVoices;
    return [];
};
