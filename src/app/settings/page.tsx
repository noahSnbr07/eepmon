'use server';

import { settingsEntries, type SettingsEntry } from "@/assets/constants/settings-links";
import Link from "next/link";

export default async function page() {


    return (
        <div className="size-full flex flex-col">
            {settingsEntries.map((setting: SettingsEntry) =>
                <Link
                    title={setting.name}
                    key={setting.id}
                    href={`/settings/${setting.href}`}
                    className="flex p-4 gap-4 odd:bg-stack"
                >
                    <div className="opacity-50"> {setting.icon} </div>
                    <b className="opacity-50"> {setting.name} </b>
                </Link>
            )}
        </div>
    );
}