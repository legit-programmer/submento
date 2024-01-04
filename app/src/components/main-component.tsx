import { Session, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { useState } from "react";
import UploadCard from "@/components/upload-card";
import RecentActivityCard from "@/components/recent-activity";
import DownloadSubtitleCard from "@/components/download-sub-card";
import VideoSegmentCard from "@/components/video-seg-card";
import { VideoSegment } from "@/components/generate-button";

const Main = ({
    supabase,
    session,
}: {
    supabase: SupabaseClient<Database>;
    session: Session | null;
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [segmentLength, setSegmentLength] = useState<number>(1);
    const [generated, setGenerated] = useState<boolean>(false)
    const [subtitleFileName, setSubtitleFileName] = useState<string|null>(null)
    const [videoSegment, setVideoSegment] = useState<VideoSegment[] | null>(null)
    return (
        <div className="p-4 sm:p-6 grid gap-4 sm:gap-6 md:grid-cols-3">
            <UploadCard
                file={file}
                segment_length={segmentLength}
                session={session}
                generated={generated}
                setFile={setFile}
                setSegmentLength={setSegmentLength}
                supabase={supabase}
                setGenerated={setGenerated}
                setSubtitleFileName={setSubtitleFileName}
                setVideoSegment={setVideoSegment}
            />
            <RecentActivityCard session={session} supabase={supabase}/>
            {generated&&<DownloadSubtitleCard session={session} supabase={supabase} subtitleFileName={subtitleFileName}/>}
            {generated&&<VideoSegmentCard variant="default" videoSegment={videoSegment}/>}    
        </div>
    );
};

export default Main;
