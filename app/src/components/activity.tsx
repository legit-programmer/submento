import { useState } from "react";
import { VideoSegment } from "@/components/generate-button";
import { UserData } from "@/components/recent-activity";
import { Button } from "@/components/ui/button";
import {
    DialogHeader,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { DownloadCloud } from "lucide-react";
import { downloadFile } from "@/lib/utils";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import VideoSegmentCard from "@/components/video-seg-card";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface ActivitySegment {
    segments: VideoSegment[];
}
const Activity = ({
    supabase,
    session,
    activity,
}: {
    supabase: SupabaseClient<Database>;
    session: Session | null;
    activity: UserData;
}) => {
    const [segments] = useState<VideoSegment[] | null>(
        JSON.parse(activity.segments ?? "{'segments':null}").segments
    );

    return (
        <Dialog>
            <DialogTrigger className="">
                <Button variant={"link"} className="rounded">
                    {activity.filename}
                </Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle className="">Video Details</DialogTitle>
                </DialogHeader>
                <ScrollArea>
                    <span className="font-bold">Name:</span>
                    <br /> {activity.filename}
                    <br />
                    <span className="font-bold">Processed at:</span> <br />
                    {new Date(activity.created_at).toLocaleTimeString()}
                    {", "}
                    {new Date(activity.created_at).toLocaleDateString()}
                    <br />
                    <span className="font-bold">Length: </span>
                    <br />
                    {segments ? segments[segments.length - 1].end_time : "Nan"}
                    <br />
                    <div className="mt-5">
                        <VideoSegmentCard videoSegment={segments} />
                    </div>
                    <Button
                    className="w-full rounded my-4"
                        onClick={async () =>
                            await downloadFile(
                                supabase,
                                `subtitles/${session?.user.id ?? ""}/${
                                    activity.storage_filename
                                }`,
                                activity.filename ?? "main.srt"
                            )
                        }
                    >
                        Download Subtitles{" "}
                        <DownloadCloud className=" ml-2 w-4 h-4" />
                    </Button>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default Activity;
