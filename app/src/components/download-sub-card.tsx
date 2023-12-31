import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { downloadFile } from "@/lib/utils";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";

const DownloadSubtitleCard = ({
    session,
    supabase,
    subtitleFileName,
}: {
    session: Session | null;
    supabase: SupabaseClient;
    subtitleFileName: string | null;
}) => {
    const handleDownload = async () => {
        const downloaded = await downloadFile(
            supabase,
            `subtitles/${session?.user.id ?? ""}/${subtitleFileName}`,
            subtitleFileName ?? ""
        );
        if (downloaded) {
            return toast({
                title: "File has been downloaded!",
            });
        }

        return toast({
            title: "Oops!",
            variant: "destructive",
            description: "File couldn't be downloaded, please try again...",
        });
    };

    return (
        <Card className="rounded-[10px] shadow-lg md:col-span-2">
            <CardHeader className="p-4">
                <h2 className="text-2xl font-semibold">Download Subtitles</h2>
            </CardHeader>
            <CardContent className="p-4">
                <p className="">
                    Once your video is processed, click the button below to
                    download your subtitle file.
                </p>
                <Button
                    onClick={handleDownload}
                    className="mt-2"
                    variant="outline"
                >
                    Download Subtitles
                </Button>
            </CardContent>
        </Card>
    );
};

export default DownloadSubtitleCard;
