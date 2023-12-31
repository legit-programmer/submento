import { ScrollArea } from "@/components/ui/scroll-area";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { VideoSegment } from "./generate-button";
const VideoSegmentCard = ({
    videoSegment,
}: {
    videoSegment: VideoSegment[] | null;
}) => {
    return (
        <Card className="rounded-[10px] shadow-lg md:col-span-2">
            <CardHeader className="p-4 ">
                <h2 className="text-2xl font-semibold">
                    Extracted Video Segments
                </h2>
            </CardHeader>
            <CardContent className="p-4">
                <ScrollArea className="h-72 w-full rounded-md ">
                    <div className="">
                        {videoSegment && videoSegment.length > 0 ? (
                            videoSegment.map((segment) => {
                                return (
                                    <Card className="rounded-[5px] my-2">
                                        <CardContent className="text-md flex h-full items-center mt-6">
                                            <h1 className="mx-3 font-bold">
                                                {segment.start_time} -{" "}
                                                {segment.end_time}
                                            </h1>
                                            <p>{segment.title}</p>
                                        </CardContent>
                                    </Card>
                                );
                            })
                        ) : (
                            <p className="mt-4 leading-7">
                                This area will display the extracted video
                                segments as text once your video is processed.
                            </p>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default VideoSegmentCard;
