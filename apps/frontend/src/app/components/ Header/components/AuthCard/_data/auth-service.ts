"only server";
import { Backend_URL } from "@/app/_lib/Constants";
import { auth } from "@/auth";
import { error } from "console";
import { Session } from "next-auth";

interface RegisterUserProps {
	email: string;
	password: string;
}

interface LoginUserProps {
	email: string;
	password: string;
}

export async function registerUserService(userData: RegisterUserProps) {
	const url = new URL("/api/auth/register", Backend_URL);
	// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	// await delay(500);

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...userData }),
			cache: "no-cache",
		});

		return response.json();
	} catch (error) {
		console.error("Registration Service Error:", error);
	}
}

export async function loginUserService(userData: LoginUserProps) {
	const url = new URL("/api/auth/log-in", Backend_URL);

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...userData }),
			cache: "no-cache",
		});

		return response.json();
	} catch (error) {
		console.error("Login Service Error:", error);
		throw error;
	}
}

export async function logoutUserService() {
	const url = new URL("/api/auth/log-out", Backend_URL);
	const session = await auth();
	console.log(session?.backendTokens.refreshToken);
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.backendTokens.refreshToken}`,
			},
			cache: "no-cache",
		});
		console.log(response.statusText);
		if (response.status !== 401) {
			return true;
		}
	} catch (error) {
		console.error("Logout  Service Error:", error);
		throw error;
	}
}
