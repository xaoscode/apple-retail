import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Backend_URL } from "./lib/Constants";
import { JWT } from "next-auth/jwt";
import { signOut } from "next-auth/react";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { config } from "process";

async function refreshToken(token: JWT): Promise<JWT | null> {
	const res = await fetch(Backend_URL + "/api/auth/refresh", {
		method: "GET",
		headers: {
			authorization: `${token.backendTokens.refreshToken}`,
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
				return user;
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user) return { ...token, ...user };
			if (new Date().getTime() < token.backendTokens.expiresIn) return token;

			return await refreshToken(token);
		},

		async session({ token, session }) {
			session.user = token.user;
			session.backendTokens = token.backendTokens;

			return session;
		},
	},
} satisfies NextAuthConfig;
