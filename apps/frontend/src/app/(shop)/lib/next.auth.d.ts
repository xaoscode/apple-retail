import { Roles } from "@repo/interfaces";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			email: string;
			role: Roles;
			image: string;
		};

		backendTokens: {
			accessToken: string;
			refreshToken: string;
			accessExp: number;
			refreshExp: number;
		};
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user: {
			id: string;
			email: string;
			role: Roles;
			image: string;
			emailVerified: Date | null;
		};

		backendTokens: {
			accessToken: string;
			refreshToken: string;
			accessExp: number;
			refreshExp: number;
		};
	}
}
