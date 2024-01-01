import { Session, SupabaseClient } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import Activity from "@/components/activity";

export interface UserData {
    created_at: string;
    filename: string | null;
    id: string;
    segments: string | null;
    storage_filename: string | null;
    user_id: string | null;
}

const RecentActivityCard = ({
    supabase,
    session,
}: {
    supabase: SupabaseClient<Database>;
    session: Session | null;
}) => {
    const [userData, setUserData] = useState<UserData[] | null>(null);

    useEffect(() => {
        const fetchActivites = async () => {
            const { data, error } = await supabase
                .from("user_data")
                .select("*")
                .eq("user_id", session?.user.id ?? "")
                .order("created_at");
            if (error) {
                return toast({
                    title: "Um...",
                    description:
                        "We were not able to fetch your recent activities at the moment!",
                });
            }

            setUserData(data.reverse());
        };

        fetchActivites();
    }, []);
    return (
        <Card className="rounded-[10px] shadow-lg">
            <CardHeader className="p-4 ">
                <h2 className="text-2xl font-semibold">Recent Activities</h2>
            </CardHeader>
            <CardContent className="p-4 ">
                <ScrollArea className="h-72 w-full rounded-md">
                    {!userData ? (
                        <h1>No Activites</h1>
                    ) : (
                        userData.map((activity) => {
                            return <Activity activity={activity} />;
                        })
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default RecentActivityCard;
