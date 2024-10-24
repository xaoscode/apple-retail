"use server";

import { Backend_URL } from "@/app/(shop)/lib/Constants";
import { auth } from "@/auth";

export async function uploadService(formData: any) {
	console.log("hello from upload service");
	const url = new URL("/api/auth/upload-avatar", Backend_URL);
	const session = await auth();
	console.log(formData);
	const form = new FormData();
	form.append("image", formData.image);
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${session?.backendTokens.refreshToken}`,
			},
			body: form,
			cache: "no-cache",
		});

		return response.json();
	} catch (error) {
		console.error("Upload Service Error:", error);
	}
}
