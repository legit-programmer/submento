import { Card, CardHeader, CardContent } from "@/components/ui/card";
import GenerateButton from "@/components/generate-button";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import FileUploadForm from "@/components/file-upload";
import { Database } from "@/types/supabase";

const UploadCard = ({
    supabase,
    session,
    file,
    segment_length,
    setFile,
    setSegmentLength,
}: {
    supabase:SupabaseClient<Database>
    session: Session | null;
    file: File | null;
    segment_length: number;
    setFile: any;
    setSegmentLength: any;
}) => {
    return (
        <Card className="rounded-lg shadow-lg md:col-span-2">
            <CardHeader className="p-4 ">
                <h2 className="text-2xl font-semibold">Upload Your Video</h2>
            </CardHeader>
            <CardContent className="p-4">
                <div className="grid gap-2">
                    <FileUploadForm
                        file={file}
                        segmentLength={segment_length}
                        session={session}
                        setFile={setFile}
                        setSegmentLength={setSegmentLength}
                        supabase={supabase}
                    />
                    <GenerateButton
                        file={file}
                        session={session}
                        segment_length={segment_length}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default UploadCard;
