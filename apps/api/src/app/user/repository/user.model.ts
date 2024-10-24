import { IUser, Roles } from '@repo/interfaces';
import { Expose } from 'class-transformer';

class UserModel implements IUser {
  id: string;
  role: Roles;
  email: string;
  @Expose({ name: 'password_hash' })
  password: string;
  @Expose({ name: 'phone_number' })
  phoneNumber: string;
  nickname: string;
  @Expose({ name: 'first_name' })
  firstName: string;
  @Expose({ name: 'last_name' })
  lastName: string;
  birthdate: string;
  image?: string;
  @Expose({ name: 'date_of_registration' })
  dateOfRegistration: string;
}

export default UserModel;
