import { Card, CardHeader, CardContent } from "@/components/ui/card";
import GenerateButton from "@/components/generate-button";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import FileUploadForm from "@/components/file-upload";
import { Database } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

const UploadCard = ({
    supabase,
    session,
    file,
    segment_length,
    generated,
    setFile,
    setSegmentLength,
    setGenerated,
    setSubtitleFileName,
    setVideoSegment,
}: {
    supabase: SupabaseClient<Database>;
    session: Session | null;
    file: File | null;
    segment_length: number;
    generated: boolean;
    setFile: any;
    setSegmentLength: any;
    setGenerated: any;
    setSubtitleFileName: any;
    setVideoSegment: any;
}) => {
    return (
        <Card className="rounded-[10px] shadow-lg md:col-span-2 space-y-5">
            <CardHeader className="p-4 ">
                <h2 className="text-2xl font-semibold">Upload Your Video</h2>
            </CardHeader>
            <CardContent className="p-4">
                {!generated ? (
                    <div className="grid gap-2 space-y-8">
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
                            supabase={supabase}
                            setGenerated={setGenerated}
                            setSubtitleFileName={setSubtitleFileName}
                            setVideoSegment={setVideoSegment}
                        />
                    </div>
                ) : (
                    <div className="w-full flex justify-center">
                        <Button
                            onClick={() => window.location.reload()}
                            className="p-[5vw]"
                            variant={"outline"}
                        >
                            Generate Another{" "}
                            <PlusCircleIcon className="w-4 h-4 ml-3" />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default UploadCard;
