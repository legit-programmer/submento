import { Session, SupabaseClient } from "@supabase/supabase-js";

import axios from "axios";
import { GaugeIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

export interface RequestFormat {
    segment_length: string;
    user_id: string;
    filename: string;
}

export interface VideoSegment {
    title: string;
    length: string;
    start_time: string;
    end_time: string;
}
export interface ResponseFormat {
    uploaded_srt_file_name: string;
    segments: VideoSegment[];
}

const GenerateButton = ({
    session,
    file,
    segment_length,
    supabase,
    setGenerated,
    setSubtitleFileName,
    setVideoSegment,
    autoSegment,
}: {
    session: Session | null;
    file: File | null;
    segment_length: number;
    supabase: SupabaseClient<Database>;
    setGenerated: any;
    setSubtitleFileName: any;
    setVideoSegment: any;
    autoSegment: boolean;
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState("");

    const fetchStatus = async () => {
        const { data } = await supabase
            .from("in_progress")
            .select("*")
            .eq("user_id", session?.user.id ?? "")
            .maybeSingle()
            if (data){
                setStatus(data?.status ?? "Contacting server");   
            }
    };
    const handleGenerate = async () => {
        const { data } = await supabase.storage.from("videos").list();
        const fileList = data?.filter((file) => {
            return file.name.includes(session?.user.id ?? "");
        });
        console.log(fileList);

        if (fileList && fileList.length > 0) {
            const payload: RequestFormat = {
                segment_length: autoSegment
                    ? "null"
                    : segment_length.toString(),
                user_id: session?.user.id ?? "",
                filename: file?.name ?? "",
            };
            try {
                setLoading(true);

                const interval = setInterval(fetchStatus, 2000);
                const res = await axios.post(
                    "http://127.0.0.1:8000/generate/",
                    payload
                );
                if (res.status === 200) {
                    const data: ResponseFormat = res.data;
                    console.log(data.segments);

                    setSubtitleFileName(data.uploaded_srt_file_name);
                    setVideoSegment(data.segments);
                    setGenerated(true);
                } else {
                    clearInterval(interval);

                    return toast({
                        description: "Internal Server Error!",
                        variant: "destructive",
                    });
                }
                clearInterval(interval);
            } catch {
                return toast({
                    description: "Error occured while contacting server!",
                    variant: "destructive",
                });
            } finally {
                console.log("cleatring");

                setLoading(false);
            }
        } else {
            return toast({
                title: "Beep Boop!",
                description: "Upload your file before generating!",
            });
        }
    };

    return (
        <div>
            <Button
                disabled={!file || loading}
                onClick={handleGenerate}
                className=" rounded-md px-6 py-3 text-lg"
            >
                <GaugeIcon className="w-6 h-6 mr-2" />
                {loading ? (
                    <p className=" flex justify-center items-center">
                        {status}...
                        <Loader2 className="animate-spin" />
                    </p>
                ) : (
                    "Start Generation"
                )}
            </Button>
        </div>
    );
};

export default GenerateButton;
