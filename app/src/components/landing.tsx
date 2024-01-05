import { SupabaseClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const LandingPage = ({supabase}:{supabase:SupabaseClient}) => {
    return (
        <div className="container h-full">
            <div className="flex h-full justify-center items-center">
                <div className="">
                    <h1 className="font-modern text-6xl text-[#623c13] text-center">
                        Submento
                    </h1>
                    <h1 className=" font-goodlook text-lg text-[#977149] mt-5">
                        Your go-to platform for effortlessly generating video
                        subtitles and creating engaging video segments
                    </h1>
                    <div className="w-full flex justify-center mt-10">
                        <Button
                            className="flex items-center animate-pulse"
                            variant={"default"}
                            onClick={() => {
                                supabase.auth.signInWithOAuth({
                                    provider: "google",
                                });
                            }}
                        >
                            Get started with Google{" "}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
