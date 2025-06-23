'use server';
import { Camera } from "lucide-react";
import Link from "next/link";



export default async function page() {


    return (
        <div className="flex flex-col gap-4 p-4">
            <Link
                className="flex p-4 gap-4 rounded-md bg-stack"
                href={"https://www.instagram.com/eule.codes.stuff"}>
                <Camera opacity={.5} /> <b> Instagram </b>
            </Link>
        </div>
    );
}