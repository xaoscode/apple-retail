import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const accessToken = req.cookies?.get("Authentication");
	const refreshToken = req.cookies?.get("Refresh");
	// Если нет access токена, проверяем наличие refresh токена
	if (!accessToken) {
		console.log(1);

		if (refreshToken) {
			const response = await fetch("http://localhost:3000/api/auth/refresh", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Cookie: `Refresh=${refreshToken.value}`,
				},
			});

			if (response.ok) {
				const setCookieHeader = response.headers.get("set-cookie");

				if (setCookieHeader) {
					const nextResponse = NextResponse.next();
					nextResponse.headers.set("Set-Cookie", setCookieHeader);

					return nextResponse;
				}
			} else {
				return NextResponse.redirect(new URL("/", req.url));
			}
		} else {
			return NextResponse.redirect(new URL("/", req.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/profile/:path*",
};
