'use client';
import Spinner from "@/utils/components/spinner";
import APIResponse from "@/interfaces/api-response";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";



export default function LogoutButton() {

    const [pending, setPending] = useState<boolean>(false);
    const router = useRouter();


    async function logout() {
        if (pending) return;
        setPending(true);

        try {
            const response = await fetch("/api/auth/logout", { method: "POST" });
            const data: APIResponse = await response.json();
            toast(data.message);
            router.push("/auth");
        } catch {
            toast("Something went wrong")
        } finally {
            setPending(false);
        }
    }

    return (
        <button
            disabled={pending}
            style={{ opacity: pending ? .5 : 1 }}
            onClick={logout}
            className="w-full bg-stack rounded-md flex gap-4 p-4"
        >
            {pending ? <Spinner /> : (
                <>
                    <LogOut opacity={.5} />
                    <b> Log out </b>
                </>
            )}
        </button>
    );
}