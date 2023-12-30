
import { Card, CardContent, CardHeader } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

const RecentActivityCard = () => {
    return (
        <Card className="rounded-lg shadow-lg">
            <CardHeader className="p-4 ">
                <h2 className="text-2xl font-semibold">Recent Activities</h2>
            </CardHeader>
            <CardContent className="p-4">
                <ScrollArea className="h-72 w-full rounded-md border">
                    <div className="p-4 text-sm">
                        <p className="mt-4 leading-7">
                            This area will display your recent activities.
                        </p>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default RecentActivityCard;
