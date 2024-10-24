"only server";
import { Backend_URL } from "@/app/(shop)/lib/Constants";
import { auth, signOut } from "@/auth";

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
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.backendTokens.refreshToken}`,
			},
			cache: "no-cache",
		});
		return response.json();
	} catch (error) {
		console.error("Logout  Service Error:", error);
		throw error;
	}
}
