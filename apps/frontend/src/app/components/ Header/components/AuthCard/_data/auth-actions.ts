"use server";
import { z } from "zod";
import { loginUserService, logoutUserService, registerUserService } from "./auth-service";
import { AuthActionState } from "./initital-state";
import { cookies } from "next/headers";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/dist/server/api-utils";

const config = {
	path: "/",
	domain: process.env.HOST ?? "localhost",
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
};

const schemaRegister = z.object({
	email: z.string().email({
		message: "Введите корректный email",
	}),
	password: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }).max(100, {
		message: "Пароль должен быть не более 100 символов.",
	}),
});

export async function registerUserAction(prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
	console.log("Hello From Register User Action");

	const validatedFields = schemaRegister.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		return {
			...prevState,
			zodErrors: validatedFields.error.flatten().fieldErrors,
			apiErrors: "",
			message: "Missing Fields. Failed to Register.",
		};
	}

	const responseData = await registerUserService(validatedFields.data);

	if (!responseData) {
		return {
			...prevState,
			apiErrors: "",
			zodErrors: {},
			message: "Ops! Something went wrong. Please try again.",
		};
	}

	if (responseData.statusCode === 400) {
		return {
			...prevState,
			apiErrors: responseData.message,
			zodErrors: {},
			message: "Failed to Register.",
		};
	}
	cookies().set("auth_access_token", responseData.backendTokens.accessToken, { ...config, maxAge: responseData.backendTokens.accessExp });
	cookies().set("auth_refresh_token", responseData.backendTokens.refreshToken, { ...config, maxAge: responseData.backendTokens.refreshExp });
	return {
		...prevState,
		data: "ok",
	};
}

const schemaLogin = z.object({
	email: z.string().min(3, { message: "email должен быть не менее 6 символов" }).max(20, { message: "email должен быть не более 20 символов" }),
	password: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }).max(100, {
		message: "Пароль должен быть не более 100 символов.",
	}),
});
export async function loginUserAction(prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
	console.log("Hello From Login User Action");
	const validatedFields = schemaLogin.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		return {
			...prevState,
			zodErrors: validatedFields.error.flatten().fieldErrors,
			message: "Пропущены поля. Ошибка авторизации.",
		};
	}

	const responseData = await signIn("credentials", { ...validatedFields.data, calbackUrl: "/", redirect: false });

	if (!responseData) {
		return {
			...prevState,
			apiErrors: responseData.message,
			zodErrors: {},
			message: "Что-то не так. Попробуйте еще раз.",
		};
	}
	if (responseData.statusCode === 400) {
		return {
			...prevState,
			apiErrors: responseData.message,
			zodErrors: {},
			message: "Ошибка авторизации.",
		};
	}
	// cookies().set("auth_access_token", responseData.backendTokens.accessToken, { ...config, maxAge: responseData.backendTokens.accessExp });
	// cookies().set("auth_refresh_token", responseData.backendTokens.refreshToken, { ...config, maxAge: responseData.backendTokens.refreshExp });

	return {
		...prevState,
		data: "ok",
	};
}

export async function logoutAction() {
	console.log("Hello From LogOut User Action");
	// cookies().set("auth_access_token", "", { ...config, maxAge: 0 });
	// cookies().set("auth_refresh_token", "", { ...config, maxAge: 0 });
	const logout = await logoutUserService();
	if (logout) {
		await signOut();
	}
}
