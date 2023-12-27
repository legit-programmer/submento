import { Session, SupabaseClient } from "@supabase/supabase-js";
import { Button, Input } from "antd";
import { useState } from "react";
import { Database } from "../../types/supabase";

const FileUploadButton = ({
    supabase,
    session,
}: {
    supabase: SupabaseClient<Database>;
    session: Session;
}) => {
    const [file, setFile] = useState<File | null>(null);
    const uploadFile = async (fileName: string, id: string, file: Blob) => {
        await supabase.storage
            .from("videos")
            .upload(`${id}-${fileName}`, file, { upsert: true });
    };
    const handleFile = async () => {
        const {data} = await supabase
            .from("in_progress")
            .select("*")
            .eq("user_id", session.user.id)
            .single();

        if (!data) {
            let chunkSize = 49000000;
            if (file && file.size / 1000000 < 200) {
                let offset = 0;
                while (offset < file.size) {
                    await uploadFile(
                        file.name,
                        offset.toString(),
                        file.slice(offset, offset + chunkSize)
                    );
                    offset += chunkSize;
                }
            }
        }
    };

    return (
        <div>
            <Input
                type="file"
                onChange={(e) =>
                    setFile(e.target.files ? e.target.files[0] : null)
                }
            />
            <Button onClick={handleFile} type="primary">
                upload
            </Button>
        </div>
    );
};

export default FileUploadButton;
