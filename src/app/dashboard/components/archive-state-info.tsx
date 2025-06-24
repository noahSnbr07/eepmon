'use client';

import { Info } from "lucide-react";

export default function ArchiveStateInfo() {

    return (
        <div className="bg-stack items-center rounded-xl flex gap-4 px-4 py-2">
            <Info size={16} opacity={.5} />
            <b className="text-sm opacity-50">
                This project has been archived for now.
            </b>
        </div>
    );
}