'use client';
import Spinner from "@/app/utils/components/spinner";
import APIResponse from "@/interfaces/api-response";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ResetButton() {
    const [pending, setPending] = useState<boolean>(false);

    async function requestMonitorReset() {
        if (pending) return;
        setPending(true);

        try {

            const response = await fetch("/api/monitor/reset", { method: "POST" });
            const data: APIResponse = await response.json();
            toast(data.message);

        } catch (error) {
            console.error(error)
            toast("Unexpected client error");
        } finally {
            setPending(false);
        }
    }

    return (
        <button
            onClick={requestMonitorReset}
            className="flex p-4 gap-4 rounded-md bg-stack">
            <Trash opacity={.5} />
            {pending ? <Spinner /> : <b> Reset Monitor Data </b>}
        </button>
    );
}