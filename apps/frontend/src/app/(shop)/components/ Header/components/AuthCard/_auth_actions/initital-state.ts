export interface AuthActionState {
	zodErrors: {
		email?: string[] | undefined | null;
		password?: string[] | undefined | null;
	};
	apiErrors: string;
	message: any;
	data: any;
}

export const INITIAL_STATE: AuthActionState = {
	zodErrors: {
		email: null,
		password: null,
	},
	apiErrors: "",
	message: "",
	data: undefined,
};
