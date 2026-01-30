import { UserButton } from "@clerk/nextjs";

export function DashboardHeader() {
    return (
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-end px-8 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "w-9 h-9"
                        }
                    }}
                />
            </div>
        </header>
    );
}
