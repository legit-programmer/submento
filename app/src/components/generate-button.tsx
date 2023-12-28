import { Session } from "@supabase/supabase-js";
import { Button } from "antd";
import axios from "axios";
import { RocketIcon } from "lucide-react";

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
        <Button type="default" onClick={handleGenerate} className=" p-10 flex items-center">
            Start Generation <RocketIcon className="ml-2 w-5 h-5 font-light " />
        </Button>
    );
};

export default GenerateButton;
