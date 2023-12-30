import { Session, SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";
import { Database } from "@/types/supabase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

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
        <div className="space-y-5">
            <Label htmlFor="video-upload">Video File</Label>
            <Input
                disabled={uploading}
                className="w-full"
                id="video-upload"
                type="file"
                onChange={(e) =>
                    setFile(e.target.files ? e.target.files[0] : null)
                }
            />
            <Button disabled={uploading} onClick={handleFile} className="mt-2" variant="outline">
                {uploading?<Loader2 className="animate-spin"/>:"Upload"}
            </Button> <br /><br />
            <Label htmlFor="slider">Adjust segment Length</Label>
            <div className="flex space-x-2">
                <Slider
                    onValueChange={(e)=>{setSegmentLength(e)}}
                    defaultValue={[segmentLength]}
                    id="slider"
                    max={300}
                    min={20}
                    className="w-[75%]"
                />
                <p className="font-light">{segmentLength} Seconds</p>
            </div>
            {uploading && <Progress value={percent} className="w-[60%]" />}
        </div>
    );
};

export default FileUploadForm;
