export interface AuthReducerState {
	email: string;
	password: string;
	isFormValid: boolean;
	errors: {
		email: string | undefined | null;
		password: string | undefined | null;
	};
}

export type AuthActions = { type: "UPDATE_FIELD"; field: "email" | "password"; value: string } | { type: "VALIDATE_FORM" } | { type: "CLEAR" } | { type: "LOGIN" };

export const INITIAL_STATE: AuthReducerState = {
	email: "",
	password: "",
	isFormValid: false,
	errors: {
		email: undefined,
		password: undefined,
	},
};

export const formReducer = (state: AuthReducerState, action: AuthActions): AuthReducerState => {
	switch (action.type) {
		case "UPDATE_FIELD": {
			const updatedState = {
				...state,
				[action.field]: action.value,
			};
			return {
				...updatedState,
				errors: {
					...updatedState.errors,
					[action.field]: validateField(action.field, action.value),
				},
			};
		}
		case "VALIDATE_FORM": {
			const emailError = validateField("email", state.email);
			const passwordError = validateField("password", state.password);
			const isFormValid = !emailError && !passwordError;
			return {
				...state,
				isFormValid,
			};
		}
		case "CLEAR": {
			return INITIAL_STATE;
		}
		case "LOGIN": {
		}
		default:
			return state;
	}
};

const validateField = (field: "email" | "password", value: string): string | null => {
	switch (field) {
		case "email":
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(value) ? null : "Введите корректный email";
		case "password":
			return value.length >= 6 ? null : "Пароль должен быть не менее 6 символов";
		default:
			return null;
	}
};
