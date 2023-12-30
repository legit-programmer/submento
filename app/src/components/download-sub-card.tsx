import { Button } from "./ui/button";
import { Card, CardHeader, CardContent } from "./ui/card";

const DownloadSubtitleCard = () => {
    return (
        <Card className="rounded-lg shadow-lg md:col-span-2">
            <CardHeader className="p-4">
                <h2 className="text-2xl font-semibold">Download Subtitles</h2>
            </CardHeader>
            <CardContent className="p-4">
                <p className="text-lg">
                    Once your video is processed, click the button below to
                    download your subtitle file.
                </p>
                <Button className="mt-2" variant="outline">
                    Download Subtitles
                </Button>
            </CardContent>
        </Card>
    );
};

export default DownloadSubtitleCard;
