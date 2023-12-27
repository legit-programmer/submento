import { SupabaseClient } from "@supabase/supabase-js";
import { Button } from "antd";


const LoginButton = ({supabase}:{supabase:SupabaseClient}) => {
    const handleLogin = () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
        });
    };
    return <Button type="link" onClick={handleLogin}>Login</Button>;
};

export default LoginButton;
