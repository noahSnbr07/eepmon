'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
import { useState } from 'react';
import APIResponse from '@/interfaces/api-response';
import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

//define valid schema
const schema = zod.object({
    name: zod.string()
        .min(4, 'Minimum Characters: 4')
        .max(24, 'Maximum Characters: 24'),
    password: zod.string()
        .min(4, 'Minimum Characters: 4')
        .max(24, 'Maximum Characters: 24')
});

//create dynamic form type
type FormData = zod.infer<typeof schema>;

export default function Card() {

    //handle limitation
    const [pending, setPending] = useState<boolean>(false);

    //display feedback
    const [message, setMessage] = useState<string>("");

    //for redirection on success
    const router = useRouter();

    //append resolver to form
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

    async function onSubmit(formData: FormData) {

        //regulate requests
        if (pending) return;
        setPending(true);

        //build form from values
        const form = new FormData();
        form.append('name', formData.name);
        form.append('password', formData.password);

        //call auth api
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: form
        });

        //evaluate request
        const data: APIResponse = await response.json();
        if (data.success) router.push("/dashboard");
        setMessage(data.message);

        setPending(false);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 bg-stack w-full max-w-md flex flex-col gap-4">
            <div className='flex flex-col gap-2'>
                <b className="text-lg text-center"> Login </b>
                <label>Name</label>
                <input
                    placeholder='name'
                    {...register('name')}
                    className="border-2 px-4 py-2 rounded-md border-stack" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className='flex flex-col gap-2'>
                <label>Password</label>
                <input
                    placeholder='password'
                    type="password"
                    {...register('password')}
                    className="border-2 px-4 py-2 rounded-md border-stack" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <button
                type="submit"
                className="rounded-md bg-accent-background font-bold text-white px-4 py-2">
                {pending ? <ClipLoader size={16} color='white' /> : "Submit"}
            </button>
            {message.length > 0 && <p className='text-red-500 text-sm'> {message} </p>}
        </form>
    );
}