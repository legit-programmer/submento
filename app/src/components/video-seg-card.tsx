import { ScrollArea } from "./ui/scroll-area";

import { Card, CardHeader, CardContent } from "./ui/card";

const VideoSegmentCard = () => {
    return (
        <Card className="rounded-lg shadow-lg md:col-span-2">
            <CardHeader className="p-4 ">
                <h2 className="text-2xl font-semibold">
                    Extracted Video Segments
                </h2>
            </CardHeader>
            <CardContent className="p-4">
                <ScrollArea className="h-72 w-full rounded-md border">
                    <div className="p-4 text-sm">
                        <p className="mt-4 leading-7">
                            This area will display the extracted video segments
                            as text once your video is processed.
                        </p>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default VideoSegmentCard;
