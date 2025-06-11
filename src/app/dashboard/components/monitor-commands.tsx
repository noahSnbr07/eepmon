'use client';

import Spinner from "@/app/utils/components/spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface _props {
    running: boolean;
}

export default function MonitorCommands({ }: _props) {

    const [pending, setPending] = useState<boolean>(false);
    const router = useRouter();

    async function submitCommand(command: "start" | "stop") {
        if (pending) return;
        setPending(true);

        await fetch(`/api/monitor/${command}`, { method: "POST" });
        router.refresh();
        setPending(false);
    }

    return (
        <div className="flex gap-2">
            <button
                onClick={() => submitCommand("start")}
                className="size-full bg-stack p-2 rounded-md font-bold">
                {pending ? <Spinner /> : "Start"}
            </button>
            <button
                onClick={() => submitCommand("stop")}
                className="size-full bg-stack p-2 rounded-md font-bold">
                {pending ? <Spinner /> : "Stop"}
            </button>
        </div>
    );
}