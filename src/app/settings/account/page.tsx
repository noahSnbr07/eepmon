'use server';

import MutationButton from "@/utils/components/mutation-button";
import { LogOut, Trash } from "lucide-react";
import PasswordInput from "./components/password-input";
import getAuth from "@/functions/get-auth";
import database from "@/config/database";
import Profile from "./components/profile";

export default async function page() {

    const auth = await getAuth();
    if (!auth) return <></>;

    const user = await database.user.findUnique({
        where: { id: auth.id },
        select: { avatar: true, name: true, id: true },
    });
    if (!user) return <></>;

    return (
        <div className="size-full flex flex-col gap-4 p-4">
            <Profile
                avatar={user.avatar}
                name={user.name}
                id={user.id}
            />
            <MutationButton
                reload
                endpoint="/api/auth/logout"
                icon={<LogOut />}
                name="Logout Session"
            />
            <MutationButton
                reload
                endpoint="/api/auth/delete"
                icon={<Trash />}
                name="Delete Account"
            />
            <PasswordInput />
        </div>
    );
}