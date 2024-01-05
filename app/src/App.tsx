import { useEffect, useState } from "react";
import { Session, createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import Main from "@/components/main-component";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import LandingPage from "@/components/landing";
import { Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);
    return (
        <div className="m-2">
            <Navbar supabase={supabase} />
            {!session ? (
                <div className="h-[75vh]">
                    <LandingPage supabase={supabase} />
                </div>
            ) : (
                <div className="mx-2">
                    <Alert className="animate-pulse flex justify-center text-red-400">
                        <div className="flex">
                            <AlertCircle />{" "}
                            <h1 className="ml-2">
                                Backend server is under maintenance.
                            </h1>
                        </div>
                    </Alert>
                    <Main session={session} supabase={supabase} />
                </div>
            )}
            <Toaster />
        </div>
    );
}

export default App;
