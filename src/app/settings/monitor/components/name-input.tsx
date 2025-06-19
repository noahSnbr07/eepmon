'use client';
import APIResponse from "@/interfaces/api-response";
import Spinner from "@/utils/components/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { string, z as zod } from "zod";

interface _props {
    currentName: string;
}

//create schema to validate form
const formSchema = zod.object({
    name: string()
        .min(4, "Minimum Length: 4")
        .max(24, "Max Length: 24")
});

//create type for form hook
type formData = zod.infer<typeof formSchema>;

export default function NameInput({ currentName }: _props) {

    //submit, default values, error, resolver
    const { register, handleSubmit, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: currentName,
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
        body.append("name", String(formData.name));

        try {

            //call endpoint
            const response = await fetch("/api/monitor/name/update", { method: "POST", body });
            const data: APIResponse = await response.json();
            toast(data.message);
        } catch (error) {

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
                    className="bg-stack rounded-md flex-1 px-4 py-2"
                    defaultValue={currentName}
                    min={4}
                    max={24}
                    {...register("name")}
                    type="text" />
                <button
                    disabled={pending}
                    style={{ opacity: pending ? .5 : 1 }}
                    type="submit"
                    className="bg-stack py-2 px-4 rounded-md"
                >
                    {pending ? <Spinner /> : "Update"}
                </button>
            </div>
            {errors.name && <i className="text-red-500 text-sm"> {errors.name.message} </i>}
        </form>
    );
}