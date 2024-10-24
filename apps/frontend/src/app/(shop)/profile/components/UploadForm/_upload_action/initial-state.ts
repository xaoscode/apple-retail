export interface UploadActionState {
	zodErrors: {
		image?: string[] | undefined | null;
	};
	apiErrors: string;
	message: any;
	data: any;
}

export const UPLOAD_INITIAL_STATE: UploadActionState = {
	zodErrors: {
		image: null,
	},
	apiErrors: "",
	message: "",
	data: undefined,
};
