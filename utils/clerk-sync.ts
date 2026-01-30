import { currentUser } from "@clerk/nextjs/server";
import { createAdminClient } from "./supabase/admin";

export async function syncUser() {
    try {
        const user = await currentUser();

        if (!user) return null;

        const supabase = createAdminClient();

        const email = user.emailAddresses[0]?.emailAddress;
        const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();

        const { data, error } = await supabase.from('users').upsert({
            id: user.id,
            email: email,
            full_name: name,
            updated_at: new Date().toISOString(),
        }).select();

        if (error) {
            console.error("syncUser Error: Failed to upsert user:", error);
        }

        return user;
    } catch (err) {
        console.error("syncUser Unhandled Error:", err);
        return null;
    }
}
