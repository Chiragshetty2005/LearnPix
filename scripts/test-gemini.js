const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Try to load .env.local manually since we are running via node directly
try {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim();
            }
        });
        console.log("Loaded .env.local");
    } else {
        console.log("No .env.local found at", envPath);
    }
} catch (e) {
    console.error("Error loading .env.local", e);
}

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("Checking API Key...", apiKey ? "Present (" + apiKey.substring(0, 5) + "...)" : "MISSING");

    if (!apiKey) {
        console.error("GEMINI_API_KEY is missing. Please add it to .env.local");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        console.log("Attempting to list models...");
        // For GoogleGenerativeAI SDK, we might need a different method or just try to generate to check.
        // But the SDK exposes a request method or we can try to get model info.
        // Actually the SDK doesn't expose listModels() directly on the top-level class in v0.24.1?
        // Let's check documentation memory... SDK usually has `getGenerativeModel`. 
        // Configuring it directly might not show list.

        // Let's try to just generate with 'gemini-1.5-flash' and print result or error.

        console.log("Testing gemini-1.5-flash...");
        const modelFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        try {
            const result = await modelFlash.generateContent("Hello?");
            console.log("gemini-1.5-flash SUCCESS:", result.response.text());
        } catch (e) {
            console.error("gemini-1.5-flash FAILED:", e.message);
        }

        console.log("Testing gemini-pro...");
        const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        try {
            const result = await modelPro.generateContent("Hello?");
            console.log("gemini-pro SUCCESS:", result.response.text());
        } catch (e) {
            console.error("gemini-pro FAILED:", e.message);
        }

    } catch (error) {
        console.error("Global Error:", error);
    }
}

listModels();
