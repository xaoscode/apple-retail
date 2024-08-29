// import { NextResponse } from "next/server";

// export async function POST(request: Request): Promise<NextResponse> {
// 	const body = await request.json();
// 	const res = await fetch(`${process.env.NESTJS_API_URL}/auth/login`, {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(body),
// 	});

// 	if (!res.ok) {
// 		return NextResponse.json({ message: "Login failed" }, { status: res.status });
// 	}

// 	const data = await res.json();
// 	const response = NextResponse.json(data);

// 	response.cookies.set("accessToken", data.accessToken, {
// 		httpOnly: true,
// 		secure: true,
// 	});

// 	return response;
// }
