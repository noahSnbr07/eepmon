'use server';

import MutationButton from "@/utils/components/mutation-button";
import { LogOut } from "lucide-react";


export default async function page() {

    return (
        <div className="size-full flex flex-col gap-4 p-4">
            <MutationButton
                reload
                endpoint="/api/auth/logout"
                icon={<LogOut />}
                name="Logout Session"
            />
        </div>
    );
}