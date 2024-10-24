import { IUser, Roles } from '@repo/interfaces';

export class UserDto implements IUser {
  id: string;
  role: Roles;
  image?: string;
  email: string;
  password: string;
  phoneNumber?: string;
  nickname?: string;
  firstName?: string;
  lastName?: string;
  birthdate?: string;
  dateOfRegistration: string;
}
