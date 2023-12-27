import { createClient } from "@supabase/supabase-js";
import { Button, Input } from "antd";
import { useState } from "react";

const FileUploadButton = () => {
    const [file, setFile] = useState<File | null>(null)
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
    const uploadFile = async (fileName:string, id:string, file:Blob)=>{
        await supabase.storage.from('videos').upload(`${id}-${fileName}`, file)
    }
    const handleFile = async ()=>{
        let chunkSize = 4900000; 
        if (file&&file.size/1000000<200) {
            let offset = 0;
            while (offset<file.size) {
                await uploadFile(file.name, offset.toString(), file.slice(offset, offset+chunkSize))
                offset+=chunkSize
            }            
        }
    }

    const deleteAll = async () =>{
        const {data} = await supabase.storage.from('videos').list()
        let filelist = Array.from(Array(data?.length).fill(""))
        
        data?.forEach((file, i)=>{
            filelist.push(data[i].name)
        })
        await supabase.storage.from('videos').remove(filelist)
    }
    return (
        <div>
            <Input type="file" onChange={e=>setFile(e.target.files?e.target.files[0]:null)}/>
            <Button onClick={handleFile} type="primary">upload</Button>
            <Button onClick={deleteAll} type="primary">Empty Bucket</Button>

        </div>
    );
};

export default FileUploadButton;
