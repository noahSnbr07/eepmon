'use server';

import LogoutButton from "./components/logout-button";

export default async function page() {


    return (
        <div className="size-full flex flex-col gap-4 p-4">
            <LogoutButton />
        </div>
    );
}