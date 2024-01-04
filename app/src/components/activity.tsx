import { useState } from "react";
import { VideoSegment } from "@/components/generate-button";
import { UserData } from "@/components/recent-activity";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { DownloadCloud } from "lucide-react";
import { downloadFile } from "@/lib/utils";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import VideoSegmentCard from "@/components/video-seg-card";


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
        <Sheet>
            <SheetTrigger>
                <Button variant={"link"} className="rounded">
                    {activity.filename}
                </Button>
            </SheetTrigger>
            <SheetContent >
                <SheetHeader>
                    <SheetTitle>Video Details</SheetTitle>
                </SheetHeader>
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
                    <VideoSegmentCard variant="small" videoSegment={segments} />
                </div>
                <Button
                    className="w-full rounded my-10"
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
            </SheetContent>
        </Sheet>
    );
};

export default Activity;
