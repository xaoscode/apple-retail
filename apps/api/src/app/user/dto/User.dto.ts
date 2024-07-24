import { IUser } from '@repo/interfaces';

export class UserDto implements IUser {
  id?: string;
  email: string;
  password: string;
  phoneNumber?: string;
  nickname?: string;
  firstName?: string;
  lastName?: string;
  birthdate?: string;
  dateOfRegistration?: string;
}
