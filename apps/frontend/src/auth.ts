import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Backend_URL } from "./lib/Constants";
import { JWT } from "next-auth/jwt";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
	...authConfig,
});
