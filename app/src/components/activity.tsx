import { useState } from "react";
import { VideoSegment } from "@/components/generate-button";
import { UserData } from "@/components/recent-activity";
import { Button } from "@/components/ui/button";
import {
    DialogHeader,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";

export interface ActivitySegment {
    segments: VideoSegment[];
}
const Activity = ({ activity }: { activity: UserData }) => {
    const [segments] = useState<VideoSegment[] | null>(
        JSON.parse(activity.segments ?? "{'segments':null}").segments
    );

    return (
        <Dialog>
            <DialogTrigger className="">
                <Button variant={"link"} className="rounded">
                    {activity.filename} 
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Video Details</DialogTitle>
                    <DialogDescription className="mt-6">
                        <span className="font-bold">Name:</span>{" "}
                        {activity.filename}
                        <br></br>
                        <span className="font-bold">Processed at:</span>{" "}
                        {new Date(activity.created_at).toLocaleTimeString()}{" "}
                        {new Date(activity.created_at).toLocaleDateString()}<br/>
                        <span className="font-bold">Length: </span>
                        {segments ? segments[segments.length - 1].end_time : "Nan"}

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default Activity;
