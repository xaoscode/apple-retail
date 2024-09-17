import { cookies } from "next/headers";

export async function getAccessToken() {
	const accessToken = cookies().get("auth-access-token")?.value;
	return accessToken;
}

export async function getRefreshToken() {
	const refreshToken = cookies().get("auth-refresh-token")?.value;
	return refreshToken;
}
