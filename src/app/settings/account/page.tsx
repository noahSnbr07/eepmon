'use server';

import MutationButton from "@/utils/components/mutation-button";
import { LogOut, Trash } from "lucide-react";
import PasswordInput from "./components/password-input";

export default async function page() {

    return (
        <div className="size-full flex flex-col gap-4 p-4">
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