import { Session, SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";
import { Database } from "@/types/supabase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "./ui/progress";
import { toast } from "@/components/ui/use-toast";

const FileUploadForm = ({
    supabase,
    session,
    file,
    setFile,
    segmentLength,
    setSegmentLength,
}: {
    supabase: SupabaseClient<Database>;
    session: Session | null;
    file: File | null;
    setFile: any;
    segmentLength: number;
    setSegmentLength: any;
}) => {
    const [uploading, setUploading] = useState<boolean>(false);
    const [percent, setPercent] = useState<number>(0);

    const uploadFile = async (id: string, file: Blob) => {
        await supabase.storage
            .from("videos")
            .upload(`${id}-${session?.user.id}.mp4`, file, { upsert: true });
    };
    const handleFile = async () => {
        const { data } = await supabase
            .from("in_progress")
            .select("*")
            .eq("user_id", session?.user.id ?? "")
            .maybeSingle();
        console.log(data);

        if (!data) {
            let chunkSize = 49000000;
            if (file && file.size / 1000000 < 200) {
                if (!file.name.endsWith(".mp4")) {
                    return toast({
                        description: "Only mp4 files are supported.",
                    });
                }
                setUploading(true);
                let offset = 0;
                let currentPercent = 0;
                while (offset < file.size) {
                    const slicedFile = file.slice(offset, offset + chunkSize);
                    await uploadFile(offset.toString(), slicedFile);
                    offset += chunkSize;
                    console.log(currentPercent);

                    currentPercent =
                        currentPercent + (slicedFile.size / file.size) * 100;
                    setPercent(
                        currentPercent > 100
                            ? 100
                            : Number(currentPercent.toFixed(0))
                    );
                    if (currentPercent >= 100) {
                        setUploading(false);
                    }
                }
            } else {
                if (!file) {
                    return toast({
                        variant: "destructive",
                        description: "Please choose a .mp4 file first",
                    });
                }

                return toast({
                    title: "Too large!",
                    description: "We only support max file size of 200mb",
                });
            }
        } else {
            toast({
                description: "Your session is already being used...",
            });
        }
    };

    return (
        <div>
            <Label htmlFor="video-upload">Video File</Label>
            <Input
                className="w-full"
                id="video-upload"
                type="file"
                onChange={(e) =>
                    setFile(e.target.files ? e.target.files[0] : null)
                }
            />
            <Button onClick={handleFile} className="mt-2" variant="outline">
                Upload
            </Button>
            <Label htmlFor="slider">Adjust segment Length</Label>
            <Slider
                onChange={setSegmentLength}
                defaultValue={[segmentLength]}
                id="slider"
                max={300}
                min={20}
            />

            <p className="font-light">Seconds</p>
            {uploading && <Progress value={percent} className="w-[60%]" />}
        </div>
    );
};

export default FileUploadForm;
