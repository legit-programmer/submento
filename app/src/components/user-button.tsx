import { SupabaseClient, User } from "@supabase/supabase-js";
import { Avatar, Button, Dropdown, MenuProps } from "antd";
import { useEffect, useState } from "react";

const UserButton = ({ supabase }: { supabase: SupabaseClient }) => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        supabase.auth.getUser().then((res) => setUser(res.data.user));
    }, []);

    const handleLogout = () => {
        supabase.auth.signOut();
    };
    const items: MenuProps["items"] = [
        {
            key: "1",
            label: <Button onClick={handleLogout}>Logout</Button>,
        },
    ];
    return (
        <Dropdown menu={{ items }} placement="bottomLeft">
            <Button shape="circle" size="large" type="link">
              <Avatar
                  size={'large'}
                  src={
                      <img src={user ? user.user_metadata.avatar_url : ""}></img>
                  }
              />
            </Button>
        </Dropdown>
    );
};

export default UserButton;
