'use client';
import APIResponse from "@/interfaces/api-response";
import schema from "@/schemas/password-update-schema";
import Spinner from "@/utils/components/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z as zod } from "zod";

//create type for form hook
type formData = zod.infer<typeof schema>;

export default function PasswordInput() {

    //submit, default values, error, resolver
    const { register, handleSubmit, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(schema),
        defaultValues: {
            password: "",
        }
    });

    //track pending state
    const [pending, setPending] = useState<boolean>(false);

    //refresh for new `currentValue? 
    const router = useRouter();

    async function onSubmit(formData: formData): Promise<void> {

        //prevent spam
        if (pending) return;
        else setPending(true);

        //create body
        const body = new FormData();
        body.append("password", String(formData.password));

        try {

            //call endpoint
            const response = await fetch("/api/auth/update/password", { method: "POST", body });
            const data: APIResponse = await response.json();
            toast(data.message);
        } catch {

            //handle client errors
            toast("Client side error occurred - 4XX");
        } finally {

            //reset pending state
            setPending(false);
            router.refresh();
        }
    }

    return (
        <form
            className="flex gap-2 flex-col"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex gap-4">
                <input
                    type="password"
                    className="bg-stack rounded-md flex-1 px-4 py-2"
                    placeholder="new password"
                    min={4}
                    max={24}
                    {...register("password")} />
                <button
                    disabled={pending}
                    style={{ opacity: pending ? .5 : 1 }}
                    type="submit"
                    className="bg-stack py-2 px-4 rounded-md"
                >
                    {pending ? <Spinner /> : "Update"}
                </button>
            </div>
            {errors.password && <i className="text-red-500 text-sm"> {errors.password.message} </i>}
        </form>
    );
}