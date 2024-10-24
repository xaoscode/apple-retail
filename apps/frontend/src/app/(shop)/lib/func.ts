"use server";
import { signIn, signOut } from "@/auth";

export async function login(formState: FormData) {
	await signIn("credentials", formState);
}

export async function signout() {
	await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/log-out`);
	await signOut();
}
