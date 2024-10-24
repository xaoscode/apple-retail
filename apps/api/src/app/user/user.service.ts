import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import UserRepository from './repository/user.repository';
import RequestWithUser from '../auth/interfaces/requestWithUser.interface';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(dto: RegisterDto) {
    return this.userRepository.createUser(dto);
  }

  async saveAvatar(file: Express.Multer.File, user: RequestWithUser) {
    return this.userRepository.saveAvatar(file.filename, user.user.email);
  }
}
