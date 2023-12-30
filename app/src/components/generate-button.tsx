import { Session, SupabaseClient } from "@supabase/supabase-js";

import axios from "axios";
import { GaugeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase";
import { toast } from "@/components/ui/use-toast";

export interface RequestFormat {
    segment_length: string;
    user_id: string;
}

const GenerateButton = ({
    session,
    file,
    segment_length,
    supabase,
}: {
    session: Session | null;
    file: File | null;
    segment_length: number;
    supabase: SupabaseClient<Database>;
}) => {
    const handleGenerate = async () => {
        console.log(file?.name);
        const { data } = await supabase.storage.from("videos").list();
        const fileList = data?.filter((file) => {
            return file.name.includes(session?.user.id ?? "");
        });
        console.log(fileList);

        if (fileList && fileList.length > 0) {
            const payload: RequestFormat = {
                segment_length: `${segment_length} seconds`,
                user_id: session?.user.id ?? "",
            };
            axios.post("http://127.0.0.1:8000/generate/", payload);
        } else {
            return toast({
                title: "Beep Boop!",
                description: "Upload your file before generating!",
            });
        }
    };

    return (
        <Button
            disabled={!file}
            onClick={handleGenerate}
            className=" rounded-md px-6 py-3 text-lg"
        >
            <GaugeIcon className="w-6 h-6 mr-2" />
            Start Generation
        </Button>
    );
};

export default GenerateButton;
