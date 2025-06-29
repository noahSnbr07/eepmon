'use client';
import React from "react";

interface _props {
    children: React.ReactNode;
    name: string;
}

export default function CardWrapper({ children, name }: _props) {

    return (
        <div className="flex flex-col gap-4 p-4 bg-stack rounded-2xl">
            <b className="text-sm opacity-50"> {name} </b>
            <div className="flex flex-col gap-2">
                {children}
            </div>
        </div>
    );
}