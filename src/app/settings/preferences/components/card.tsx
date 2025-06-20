'use client';
import Spinner from "@/utils/components/spinner";
import APIResponse from "@/interfaces/api-response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z as zod } from "zod";
import schema from "@/schemas/preferences-schema";

type FormData = zod.infer<typeof schema>;

interface _props {
    defaultMin: number;
    defaultPreferred: number;
    defaultMax: number;
    defaultDelay: number;
    defaultLogCap: number;
}

export default function Card({ defaultMin, defaultPreferred, defaultMax, defaultDelay, defaultLogCap }: _props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            minHours: defaultMin,
            preferredHours: defaultPreferred,
            maxHours: defaultMax,
            delay: defaultDelay,
            logCap: defaultLogCap,
        }
    });

    const [pending, setPending] = useState<boolean>(false);

    // Watch all form values
    const formValues = watch();

    async function onSubmit(formData: FormData) {
        if (pending) return;
        setPending(true);

        //create form
        const form = new FormData();
        form.append("min", String(formData.minHours));
        form.append("preferred", String(formData.preferredHours));
        form.append("max", String(formData.maxHours));
        form.append("delay", String(formData.delay));
        form.append("cap", String(formData.logCap));

        //define fetch parameters
        const url = "/api/profile/update";
        const options: RequestInit = { method: "POST", body: form }

        //validate api response
        const response = await fetch(url, options)
        const data: APIResponse = await response.json();
        toast(data.message);

        setPending(false);
    }

    return (
        <form
            className="w-full flex flex-col gap-4 p-4"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md flex flex-col gap-2 bg-stack p-4">
                <label htmlFor="minHours">Minimum Hours: {formValues.minHours}</label>
                <input
                    defaultValue={defaultMin}
                    min={2}
                    max={14}
                    {...register("minHours")}
                    type="range" />
                {errors.minHours && <i className="text-red-500 text-sm"> {errors.minHours?.message} </i>}
            </div>
            <div className="rounded-md flex flex-col gap-2 bg-stack p-4">
                <label htmlFor="preferredHours">Preferred Hours: {formValues.preferredHours}</label>
                <input
                    defaultValue={defaultPreferred}
                    min={2}
                    max={14}
                    {...register("preferredHours")}
                    type="range" />
                {errors.preferredHours && <i className="text-red-500 text-sm"> {errors.preferredHours.message} </i>}
            </div>
            <div className="rounded-md flex flex-col gap-2 bg-stack p-4">
                <label htmlFor="maxHours">Maximum Hours: {formValues.maxHours}</label>
                <input
                    defaultValue={defaultMax}
                    min={2}
                    max={14}
                    {...register("maxHours")}
                    type="range" />
                {errors.maxHours && <i className="text-red-500 text-sm"> {errors.maxHours?.message} </i>}
            </div>
            <div className="rounded-md flex flex-col gap-2 bg-stack p-4">
                <label htmlFor="maxHours">Monitor Delay: {formValues.delay}</label>
                <input
                    defaultValue={defaultDelay}
                    step={.1}
                    min={0}
                    max={1}
                    {...register("delay")}
                    type="range" />
                {errors.delay && <i className="text-red-500 text-sm"> {errors.delay?.message} </i>}
            </div>
            <div className="rounded-md flex flex-col gap-2 bg-stack p-4">
                <label htmlFor="maxHours">Log Load Limit: {formValues.logCap}</label>
                <input
                    defaultValue={defaultDelay}
                    min={1}
                    max={31}
                    {...register("logCap")}
                    type="range" />
                {errors.delay && <i className="text-red-500 text-sm"> {errors.logCap?.message} </i>}
            </div>
            <div className="p-4 bg-stack rounded-md">
                <h3 className="font-bold mb-2">Current Values:</h3>
                <p>Minimum: {defaultMin} hours</p>
                <p>Preferred: {defaultPreferred} hours</p>
                <p>Maximum: {defaultMax} hours</p>
                <p>Delay: {defaultDelay} hours</p>
                <p>Log Load Limit: {defaultLogCap} hours</p>
            </div>
            <button
                className="p-4 bg-stack rounded-md font-bold"
                type="submit">
                {pending ? <Spinner /> : "Update Preferences"}
            </button>
        </form>
    );
}