import { Session, SupabaseClient } from "@supabase/supabase-js";
import { Button, Input, InputNumber, Slider, message } from "antd";
import { useState } from "react";
import { Database } from "../../types/supabase";
import { UploadIcon } from "lucide-react";
import ProgressModal from "./progress-modal";

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
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
                className=" w-[75vw] lg:w-[25vw]"
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
            <div className="flex items-center">
                <Slider
                    min={20}
                    max={300}
                    onChange={setSegmentLength}
                    value={segmentLength}
                    className=" w-[75vw] lg:w-[25vw]"
                />
                <InputNumber
                    min={20}
                    max={300}
                    className="mx-2"
                    value={segmentLength}
                    onChange={setSegmentLength}
                />
                <p className="font-light">Seconds</p>
            </div>
            <ProgressModal isModalOpen={isModalOpen} percent={percent} />
        </div>
    );
};

export default FileUploadForm;
