'use server';

import getAuth from "@/functions/get-auth";

export default async function page() {

  const auth = await getAuth();
  console.log(auth)

  return (
    <>
      page
    </>
  );
}