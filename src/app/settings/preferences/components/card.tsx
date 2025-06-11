'use client';
import Spinner from "@/app/utils/components/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";

const schema = zod.object({
    minHours: zod.coerce.number()
        .min(4, { message: "Minimum is 4 hours" })
        .max(8, { message: "Maximum is 8 hours" }),
    preferredHours: zod.coerce.number()
        .min(4, { message: "Minimum is 4 hours" })
        .max(8, { message: "Maximum is 8 hours" }),
    maxHours: zod.coerce.number()
        .min(4, { message: "Minimum is 4 hours" })
        .max(8, { message: "Maximum is 8 hours" }),
});

type FormData = zod.infer<typeof schema>;

interface _props {
    defaultMin: number;
    defaultPreferred: number;
    defaultMax: number;
}

export default function Card({ defaultMin, defaultPreferred, defaultMax }: _props) {
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
        }
    });

    const [pending, setPending] = useState<boolean>(false);

    // Watch all form values
    const formValues = watch();

    async function onSubmit(formData: FormData) {
        if (pending) return;
        setPending(true);

        const form = new FormData();
        form.append("min", String(formData.minHours));
        form.append("preferred", String(formData.preferredHours));
        form.append("max", String(formData.maxHours));

        const url = "/api/profile/update";
        const options: RequestInit = { method: "POST", body: form }

        await fetch(url, options)

        setPending(false);
    }

    return (
        <form
            className="w-full flex flex-col gap-4 p-4"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md flex flex-col gap-2 bg-stack p-4">
                <label htmlFor="minHours">Minimum Hours: {formValues.minHours}</label>
                <input
                    min={4}
                    max={8}
                    {...register("minHours")}
                    type="range" />
                {errors.minHours && <i className="text-red-500 text-sm"> {errors.minHours.message} </i>}
            </div>
            <div className="rounded-md flex flex-col gap-2 bg-stack p-4">
                <label htmlFor="preferredHours">Preferred Hours: {formValues.preferredHours}</label>
                <input
                    min={4}
                    max={8}
                    {...register("preferredHours")}
                    type="range" />
                {errors.preferredHours && <i className="text-red-500 text-sm"> {errors.preferredHours.message} </i>}
            </div>
            <div className="rounded-md flex flex-col gap-2 bg-stack p-4">
                <label htmlFor="maxHours">Maximum Hours: {formValues.maxHours}</label>
                <input
                    min={4}
                    max={8}
                    {...register("maxHours")}
                    type="range" />
                {errors.maxHours && <i className="text-red-500 text-sm"> {errors.maxHours.message} </i>}
            </div>
            <div className="p-4 bg-stack rounded-md">
                <h3 className="font-bold mb-2">Current Values:</h3>
                <p>Minimum: {defaultMin} hours</p>
                <p>Preferred: {defaultPreferred} hours</p>
                <p>Maximum: {defaultMax} hours</p>
            </div>
            <button
                className="p-4 bg-stack rounded-md font-bold"
                type="submit">
                {pending ? <Spinner /> : "Update Preferences"}
            </button>
        </form>
    );
}