import { ScrollArea } from "@/components/ui/scroll-area";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { VideoSegment } from "./generate-button";
import { cn } from "@/lib/utils";
const VideoSegmentCard = ({
    videoSegment,
    variant = "default",
}: {
    videoSegment: VideoSegment[] | null;
    variant: "default" | "small";
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
                                    <Card
                                        className="rounded-[5px] my-2"
                                        key={segment.title}
                                    >
                                        <CardContent
                                            className={cn(
                                                "text-md h-full items-center mt-6",
                                                variant == "default" && "flex"
                                            )}
                                        >
                                            <h1
                                                className={cn(
                                                    " font-bold",
                                                    variant == "default" &&
                                                        "mx-3"
                                                )}
                                            >
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
