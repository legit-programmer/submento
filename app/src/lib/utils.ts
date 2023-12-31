import { SupabaseClient } from "@supabase/supabase-js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const downloadFile = async (
    supabaseContext: SupabaseClient,
    filePath: string,
    downloadAsName:string
) => {
  

    const { data, error } = await supabaseContext.storage
        .from("videos")
        .download(filePath);
    if (error) {
        console.log(error.message);
        return false;
    }
    

    if (data) {
        const blobUrl = URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = downloadAsName;

        document.body.appendChild(link);
        link.dispatchEvent(
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
            })
        );

        document.body.removeChild(link);
    }

    return true;
};
