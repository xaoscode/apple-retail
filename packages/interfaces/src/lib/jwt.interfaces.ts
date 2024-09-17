import { Request } from "express";

export interface IJwt extends Request {
	user: {
		id: string;
		email: string;
		name: string;
	};
	backendTokens: {
		accessToken: string;
		accessExp: string;
		refreshToken: string;
		refreshExp: string;
	};
}
