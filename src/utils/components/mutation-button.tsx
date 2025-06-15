'use client';

import APIResponse from "@/interfaces/api-response";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./spinner";

interface _props {
    name: string;
    icon: React.JSX.Element;
    endpoint: string;
    className?: string;
}

export default function MutationButton({ name, icon, endpoint, className }: _props) {

    //track submission state
    const [pending, setPending] = useState<boolean>(false);

    async function runMutation() {
        if (pending) return;
        setPending(true);

        try {

            //fetch resource
            const response = await fetch(endpoint, { method: "POST" });
            const data: APIResponse = await response.json();
            toast(data.message);

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
            {icon}
            {pending ? <div className="flex-1"> <Spinner /> </div> : <b> {name} </b>}
        </button>
    );
}