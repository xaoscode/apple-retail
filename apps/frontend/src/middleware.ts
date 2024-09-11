import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

<<<<<<< HEAD
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

=======
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {
	// Your custom middleware logic goes here
});
>>>>>>> next-15-update
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
