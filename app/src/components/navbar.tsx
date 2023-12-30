import { UserAccount } from "@/components/user-button";

import { SupabaseClient } from "@supabase/supabase-js";

export const Navbar = ({ supabase }: { supabase: SupabaseClient }) => {
    return (
        <header className="top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex gap-6 md:gap-10">
                    <span className="inline-block font-bold text-3xl">Submento</span>
                </div>

                <div className="flex flex-1 items-center justify-end">
                    <nav className="flex items-center justify-center gap-5">
                        <UserAccount supabase={supabase} />
                    </nav>
                </div>
            </div>
        </header>
    );
};
