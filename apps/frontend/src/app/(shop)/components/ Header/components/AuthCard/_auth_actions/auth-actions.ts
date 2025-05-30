"use server";
import { z } from "zod";
import { logoutUserService, registerUserService } from "./auth-service";
import { AuthActionState } from "./initital-state";
import { signIn, signOut } from "@/auth";

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

	return {
		...prevState,
		data: "ok",
	};
}

export async function logoutAction(prevState: AuthActionState): Promise<AuthActionState> {
	console.log("Hello From LogOut User Action");

	const responseData = await logoutUserService();
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
	await signOut({ redirect: false }).catch((error) => {
		console.error("Error during sign out:", error);
	});
	console.log("User signed out");

	return {
		...prevState,
		data: "ok",
	};
}
