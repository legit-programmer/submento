import { Session, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types/supabase";
import FileUploadButton from "./file-upload";

const Main = ({
    supabase,
    session,
}: {
    supabase: SupabaseClient<Database>;
    session: Session | null;
}) => {
    return (
        <div>
            <FileUploadButton session={session} supabase={supabase} />
        </div>
    );
};

export default Main;
