import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Backend_URL } from "./app/(shop)/lib/Constants";

async function refreshToken(token: JWT): Promise<JWT | null> {
	const url = new URL("/api/auth/refresh", Backend_URL);
	const res = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token.backendTokens.refreshToken}`,
		},
	});
	console.log("refreshed");
	if (res.statusText === "Unauthorized") {
		return null;
	}
	const response = await res.json();

	return {
		...token,
		backendTokens: response,
	};
}
export default {
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				if (!credentials?.email || !credentials?.password) return null;
				const { email, password } = credentials;
				const res = await fetch(Backend_URL + "/api/auth/log-in", {
					method: "POST",
					body: JSON.stringify({
						email,
						password,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (res.status == 401) {
					return null;
				}
				const user = await res.json();
				console.log(user);
				return user;
			},
		}),
	],

	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (user) return { ...token, ...user };
			if (new Date().getTime() < token.backendTokens.accessExp) return token;

			return await refreshToken(token);
		},
		async session({ token, session, trigger, newSession }) {
			if (trigger === "update") {
				console.log("update session");
			}
			session.user = token.user;
			session.backendTokens = token.backendTokens;

			return session;
		},
	},
} satisfies NextAuthConfig;
