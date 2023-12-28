import { Session, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { useState } from "react";
import UploadCard from "@/components/upload-card";

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
        <div>
            <UploadCard
                file={file}
                segment_length={segmentLength}
                session={session}
                setFile={setFile}
                setSegmentLength={setSegmentLength}
                supabase={supabase}
            />
        </div>
    );
};

export default Main;
