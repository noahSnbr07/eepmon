'use server';

import getAuth from "@/functions/get-auth";
import { redirect } from "next/navigation";

export async function GET() {

  const auth = await getAuth();
  if (auth) return redirect("/dashboard");
  else return redirect("/auth");
}