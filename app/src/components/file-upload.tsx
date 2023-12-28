import { Session, SupabaseClient } from "@supabase/supabase-js";
import { Button, Input, message } from "antd";
import { useState } from "react";
import { Database } from "../../types/supabase";
import { UploadIcon } from "lucide-react";
import ProgressModal from "./progress-modal";

const FileUploadButton = ({
    supabase,
    session,
}: {
    supabase: SupabaseClient<Database>;
    session: Session | null;
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [percent, setPercent] = useState<number>(0);

    const uploadFile = async (fileName: string, id: string, file: Blob) => {
        await supabase.storage
            .from("videos")
            .upload(`${id}-${fileName}`, file, { upsert: true });
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
                    return messageApi.open({
                        type: "warning",
                        content: "Only mp4 files are supported.",
                    });
                }
                setIsModalOpen(true);
                let offset = 0;
                let currentPercent = 0;
                while (offset < file.size) {
                    const slicedFile = file.slice(offset, offset + chunkSize);
                    await uploadFile(file.name, offset.toString(), slicedFile);
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
                        setIsModalOpen(false);
                    }
                }
            } else {
                if (!file) {
                    return messageApi.open({
                        type: "error",
                        content: "Please choose a .mp4 file first",
                    });
                }

                return messageApi.open({
                    type: "warning",
                    content: "We only support max file size of 200mb",
                });
            }
        } else {
            messageApi.open({
                type: "warning",
                content: "Your session is already being used...",
            });
        }
    };

    return (
        <div>
            {contextHolder}
            <Input
                type="file"
                onChange={(e) =>
                    setFile(e.target.files ? e.target.files[0] : null)
                }
            />
            <Button
                onClick={handleFile}
                type="default"
                size="large"
                shape="default"
                className="flex items-center"
            >
                Upload <UploadIcon className="ml-2 w-4 h-4" />
            </Button>
            <ProgressModal isModalOpen={isModalOpen} percent={percent} />
        </div>
    );
};

export default FileUploadButton;
