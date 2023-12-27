
import LoginButton from "./login-button";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import UserButton from "./user-button";

const Navbar = ({session, supabase}:{session:Session | null, supabase:SupabaseClient}) => {
    return (
        <nav className="flex w-full justify-between items-center h-14">
            <h1 className=" font-bold text-2xl ml-5">Submento</h1>
            <div className="mr-5">
                {!session?<LoginButton supabase={supabase}/>:<UserButton supabase={supabase}/>
                }
            </div>
        </nav>
    );
};

export default Navbar;
