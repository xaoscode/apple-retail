export async function login(email: string, password: string) {
	const res = await fetch("http://localhost:3000/api/auth/log-in", {
		method: "POST",
		body: JSON.stringify({
			email,
			password,
		}),
	});
	return res.json();
}
