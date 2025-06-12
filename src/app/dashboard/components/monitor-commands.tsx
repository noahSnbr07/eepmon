'use client';

import Spinner from "@/app/utils/components/spinner";
import APIResponse from "@/interfaces/api-response";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface _props {
    running: boolean;
}

export default function MonitorCommands({ }: _props) {

    const [pending, setPending] = useState<boolean>(false);
    const router = useRouter();

    async function submitCommand(command: "start" | "stop") {
        if (pending) return;
        setPending(true);

        const response = await fetch(`/api/monitor/${command}`, { method: "POST" });
        const data: APIResponse = await response.json();

        toast(data.message)
        router.refresh();
        setPending(false);
    }

    return (
        <div className="flex gap-2">
            <button
                style={{ opacity: pending ? .5 : 1 }}
                disabled={pending}
                onClick={() => submitCommand("start")}
                className="size-full bg-stack p-2 rounded-md font-bold">
                {pending ? <Spinner /> : "Start"}
            </button>
            <button
                style={{ opacity: pending ? .5 : 1 }}
                disabled={pending}
                onClick={() => submitCommand("stop")}
                className="size-full bg-stack p-2 rounded-md font-bold">
                {pending ? <Spinner /> : "Stop"}
            </button>
        </div>
    );
}