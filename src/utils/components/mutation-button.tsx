'use client';

import APIResponse from "@/interfaces/api-response";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./spinner";
import { useRouter } from "next/navigation";

interface _props {
    name: string;
    icon?: React.JSX.Element;
    endpoint: string;
    className?: string;
    reload?: boolean;
}

export default function MutationButton({ name, icon, endpoint, className, reload }: _props) {

    //track submission state
    const [pending, setPending] = useState<boolean>(false);
    const router = useRouter();

    async function runMutation() {
        if (pending) return;
        setPending(true);

        try {

            //fetch resource
            const response = await fetch(endpoint, { method: "POST" });
            const data: APIResponse = await response.json();
            toast(data.message);
            if (reload) router.refresh();

            //handle error
        } catch (error) {
            toast("Unexpected client error");

            //reset state
        } finally {
            setPending(false);
        }
    }

    return (
        <button
            style={{ opacity: pending ? .5 : 1 }}
            disabled={pending}
            onClick={runMutation}
            className={className ? className : "bg-stack rounded-md p-4 gap-4 flex"}>
            {icon && icon}
            {pending ? <div className="flex-1"> <Spinner /> </div> : name}
        </button>
    );
}