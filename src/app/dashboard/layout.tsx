'use server';
import { icon, mario } from "@/assets/assets";
import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface _props {
    children: React.ReactNode
}

export default async function layout({ children }: _props) {

    return (
        <div className="size-full flex flex-col">
            <header className="flex gap-4 p-4 border-b-2 border-stack justify-between">
                <Link
                    href={"/dashboard"}
                    title="Home">
                    <Image
                        src={icon}
                        height={24}
                        width={24}
                        title="Home"
                        alt="Home"
                    />
                </Link>
                <Image
                    src={mario}
                    unoptimized
                    height={24}
                    alt="Sleepy Mario"
                    title="Sleepy Mario"
                />
                <Link
                    href={"/settings"}
                    title="Settings">
                    <Settings size={24} opacity={.5} />
                </Link>
            </header>
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}