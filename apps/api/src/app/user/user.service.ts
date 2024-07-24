import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import UserRepository from './respository/user.repository';
import { UserDto } from './dto/User.dto';

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

  async create(dto: UserDto) {
    return this.userRepository.createUser(dto);
  }
}
