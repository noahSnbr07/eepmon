'use client';

import { TriangleAlert } from "lucide-react";

interface _props {
    logCap: number;
    totalLogs: number;
}
export default function LogCapInfo({ logCap, totalLogs }: _props) {
    return (
        <div className="py-2 px-4 items-center flex gap-4 bg-stack rounded-xl">
            <TriangleAlert size={16} opacity={.5} />
            <b className="text-sm opacity-50">
                Rendered Logs: {logCap} / {totalLogs}
            </b>
        </div>
    );
}