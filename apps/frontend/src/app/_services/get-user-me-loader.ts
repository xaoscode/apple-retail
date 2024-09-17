import { Backend_URL } from "@/_lib/Constants";
import qs from "qs";
import { getAccessToken, getRefreshToken } from "./get-token";
import { error } from "console";

const query = qs.stringify({
	populate: { image: { fields: ["url", "alternativeText"] } },
});

export async function getUserMeLoader() {
	const refreshUrl = new URL("/api/auth/refresh", Backend_URL);
	const accesUrl = new URL("/api/auth", Backend_URL);

	const refreshToken = await getRefreshToken();
	const accessToken = await getAccessToken();

	if (accessToken) {
		const response = await fetch(accesUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			cache: "no-cache",
		});
		const data = await response.json();
		if (data.statusCode === 401) return { ok: false, data: null, error: data.message };
		return { ok: true, data: data, error: null };
	}

	if (refreshToken) {
		const response = await fetch(refreshUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${refreshToken}`,
			},
			cache: "no-cache",
		});
		const data = await response.json();
		if (data.statusCode === 401) return { ok: false, data: null, error: data.message };
		cookies().set("auth_access_token", responseData.backendTokens.accessToken, { ...config, maxAge: responseData.backendTokens.accessExp });
		cookies().set("auth_refresh_token", responseData.backendTokens.refreshToken, { ...config, maxAge: responseData.backendTokens.refreshExp });
	}

	if (!authToken) return { ok: false, data: null, error: null };

	try {
		const response = await fetch(url.href, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
			},
			cache: "no-cache",
		});
		const data = await response.json();
		if (data.error) return { ok: false, data: null, error: data.error };
		return { ok: true, data: data, error: null };
	} catch (error) {
		console.log(error);
		return { ok: false, data: null, error: error };
	}
}
