'use server';
import React from "react";
import Wrapper from "../../utils/components/wrapper";

interface _props {
    children: React.ReactNode;
}

export default async function layout({ children }: _props) {


    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}