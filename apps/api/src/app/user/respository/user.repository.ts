import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import UserModel from './user.model';
import DatabaseService from '../../core/database/database.service';
import { UserDto } from '../dto/User.dto';

@Injectable()
class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    const databaseResponse = await this.databaseService.runQuery(`
            SELECT * FROM users;
            `);
    return plainToInstance(UserModel, databaseResponse.rows);
  }

  async findByEmail(email: string) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * 
      FROM users
      WHERE email = $1;
      `,
      [email],
    );
    return plainToInstance(UserModel, databaseResponse.rows[0]);
  }

  async findById(id: string) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * 
      FROM users
      WHERE id = $1;
      `,
      [id],
    );
    return plainToInstance(UserModel, databaseResponse.rows[0]);
  }

  async createUser(UserDto: UserDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      RETURNING *;
      `,
      [UserDto.email, UserDto.password],
    );
    return plainToInstance(UserModel, databaseResponse.rows[0]);
  }
}

export default UserRepository;
