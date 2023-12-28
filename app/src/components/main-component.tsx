import { Session, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import GenerateButton from "@/components/generate-button";
import { useState } from "react";
import FileUploadForm from "@/components/file-upload";

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
            <FileUploadForm
                session={session}
                supabase={supabase}
                file={file}
                setFile={setFile}
                segmentLength={segmentLength}
                setSegmentLength={setSegmentLength}
            />

            <GenerateButton
                file={file}
                session={session}
                segment_length={segmentLength}
            />
        </div>
    );
};

export default Main;
