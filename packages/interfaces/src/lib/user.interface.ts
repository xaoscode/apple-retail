export enum Roles {
	ADMIN = "admin",
	USER = "user",
	WORKER = "worker",
}
export interface IUser {
	id: string;
	role: Roles;
	email: string;
	password: string;
	phoneNumber?: string;
	nickname?: string;
	firstName?: string;
	lastName?: string;
	birthdate?: string;
	image?: string;
	dateOfRegistration: string;
}
