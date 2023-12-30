import { Session, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { useState } from "react";
import UploadCard from "@/components/upload-card";
import RecentActivityCard from "./recent-activity";
import DownloadSubtitleCard from "./download-sub-card";
import VideoSegmentCard from "./video-seg-card";

const Main = ({
    supabase,
    session,
}: {
    supabase: SupabaseClient<Database>;
    session: Session | null;
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [segmentLength, setSegmentLength] = useState<number>(120);
    return (
        <div className="p-4 sm:p-6 grid gap-4 sm:gap-6 md:grid-cols-3">
            <UploadCard
                file={file}
                segment_length={segmentLength}
                session={session}
                setFile={setFile}
                setSegmentLength={setSegmentLength}
                supabase={supabase}
            />
            <RecentActivityCard/>
            <DownloadSubtitleCard/>
            <VideoSegmentCard/>
        </div>
    );
};

export default Main;
