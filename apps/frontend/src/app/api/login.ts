export async function login(email: string, password: string) {
	const response = await fetch("http://localhost:3000/api/auth/log-in", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Ошибка авторизации");
	}

	return response.json();
}

export async function refreshAccessToken() {
	const response = await fetch("http://localhost:3000/api/auth/refresh", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		// Используем credentials: "include", чтобы включить куки в запрос
		credentials: "include",
	});

	if (!response.ok) {
		console.log(response);
		throw new Error(`Ошибка обновления access токена: ${response.status}`);
	}

	// Возвращаем новый access token
	return response.json();
}
