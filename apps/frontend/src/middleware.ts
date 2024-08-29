import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const accessToken = req.cookies?.get("Authentication");
	const refreshToken = req.cookies.get("Refresh");
	console.log(refreshToken);
	// Если нет access токена, проверяем наличие refresh токена
	if (!accessToken) {
		if (refreshToken) {
			const cookieHeader = `Refresh=${refreshToken.value}`;

			const response = await fetch("http://localhost:3000/api/auth/refresh", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Cookie: `Refresh=${refreshToken.value}`,
				},
			});

			console.log(response.status);
			if (response.ok) {
				console.log("ура ");
			} else {
				// Если обновление не удалось, перенаправляем на страницу входа
				return NextResponse.redirect(new URL("/", req.url));
			}
		} else {
			// Если нет ни access, ни refresh токена, перенаправляем на страницу входа
			return NextResponse.redirect(new URL("/", req.url));
		}
	}

	// Если access токен есть, продолжаем выполнение запроса
	return NextResponse.next();
}

// Применение middleware к нужным роутам
export const config = {
	matcher: "/profile/:path*",
};
