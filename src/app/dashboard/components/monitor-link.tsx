'use server';

import { Moon } from "lucide-react";
import Link from "next/link";

interface _props {
    running: boolean;
}

export default async function MonitorLink({ running }: _props) {

    return (
        <Link
            href={"/monitor"}
            title="Monitor"
            className="flex p-4 gap-4 bg-stack rounded-md items-center"
        >
            <Moon fill="white" opacity={.5} />
            <b className="opacity-50"> Open Monitor ({running ? "active" : "not active"}) </b>
        </Link>
    );
}