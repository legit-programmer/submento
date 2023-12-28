import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { PersonStandingIcon } from "lucide-react";

export const UserAccount = ({ supabase }: { supabase: SupabaseClient }) => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        supabase.auth.getUser().then((res) => setUser(res.data.user));
    }, []);
    const handleLogin = () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
        });
    };
    const handleLogout = () => {
        supabase.auth.signOut();
    };

    return user ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={"ghost"}
                    className="ml-1 relative h-8 w-8 rounded-full"
                >
                    <Avatar>
                        <AvatarImage src={user.user_metadata.avatar_url} />
                        <AvatarFallback>
                            <PersonStandingIcon />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.user_metadata.full_name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Button
                            onClick={handleLogout}
                            variant={"destructive"}
                            className="w-full"
                        >
                            Log Out
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <Button onClick={handleLogin}>Login</Button>
    );
};
