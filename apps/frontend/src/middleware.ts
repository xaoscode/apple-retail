import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {
	const host = req.headers.get("host") || "";
	if (host.startsWith("admin.")) {
		const url = req.nextUrl.clone();
		url.pathname = "/admin/login"; // Перенаправляем на страницу входа для администраторов
		return NextResponse.redirect(url);
	}

	// Продолжаем выполнение для других запросов
	return NextResponse.next();
});

export const config = {
	matcher: [
		{ source: "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*.svg$|.*.jpg$).*)" },
		{ source: "/profile/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*.svg$|.*.jpg$).*)" },
	],
};
