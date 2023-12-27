
import { useEffect, useState } from "react";
import FileUploadButton from "./components/file-upload";
import { Session, createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase"
import Navbar from "./components/navbar";


const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
    const [session, setSession] = useState<Session|null>(null)
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
        <main className="">
            <Navbar session={session} supabase={supabase}/>
            {session?<div>sdljkhflsdf</div>:<div>dsklfjhsdlkfj</div>}
        </main>
    )
}

export default App;
