'use client';

interface _props {
    avatar: string;
    name: string;
    id: string;
}
export default function Profile({ avatar, name, id }: _props) {


    return (
        <div className="flex bg-stack rounded-md p-4 gap-4 items-center">
            <p> {avatar} </p>
            <b> {name} </b>
            <i className="opacity-50 text-sm"> {id} </i>
        </div>
    );
}