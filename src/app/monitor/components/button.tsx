"use client";

import APIResponse from "@/interfaces/api-response";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

interface _props {
    running: boolean;
}

export default function Button({ running }: _props) {

    const text = running ? "Stop" : "Start";
    const router = useRouter();
    const [pending, setPending] = useState<boolean>(false);

    async function onCLickHandler() {
        if (pending) return;
        setPending(true);
        const url = `/api/monitor/${running ? "stop" : "start"}`;
        const options: RequestInit = { method: "POST" }

        const response = await fetch(url, options);
        const data: APIResponse = await response.json();
        toast(data.message);
        router.refresh();
        setPending(false);
    }

    return (
        <button
            onClick={onCLickHandler}
            className="w-3xs py-2 text-lg font-bold bg-stack rounded-md">
            {pending ? <ClipLoader size={16} color="white" /> : text}
        </button>
    );
}