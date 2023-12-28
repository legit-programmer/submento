import { Session } from "@supabase/supabase-js";

import axios from "axios";
import { GaugeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface RequestFormat {
    segment_length: string;
    user_id: string;
}

const GenerateButton = ({
    session,
    file,
    segment_length,
}: {
    session: Session | null;
    file: File | null;
    segment_length: number;
}) => {
    const handleGenerate = () => {
        console.log(file?.name);

        const payload: RequestFormat = {
            segment_length: `${segment_length} seconds`,
            user_id: session?.user.id ?? "",
        };
        axios.post("http://127.0.0.1:8000/generate/", payload);
    };

    return (
        <Button onClick={handleGenerate} className=" rounded-md px-6 py-3 text-lg">
            <GaugeIcon className="w-6 h-6 mr-2" />
            Start Generation
        </Button>
    );
};

export default GenerateButton;
