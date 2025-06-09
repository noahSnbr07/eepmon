'use server';

import getAuth from "@/functions/get-auth";
import { redirect, RedirectType } from "next/navigation";

export default async function page() {

  const auth = await getAuth();
  if (auth) redirect("/dashboard", RedirectType.replace);

  return (
    <>
      page
    </>
  );
}