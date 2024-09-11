import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare, hash } from 'bcrypt';
import { PostgresError } from 'pg-error-enum';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(dto: RegisterDto) {
    const hashedPassword = await hash(dto.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...dto,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (e) {
      if (e?.code === PostgresError.UNIQUE_VIOLATION) {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  public getCookieWithJwtAccessToken(userId: string) {
    const payload: TokenPayload = { userId };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
    });
    return {
      accessToken,
      accessExp: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    };
  }

  public async getCookieWithJwtRefreshToken(userId: string) {
    const payload: TokenPayload = { userId };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
    });
    return {
      refreshToken,
      refreshExp: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    };
  }

  public getCookieForLogOut() {
    return [`Authentication=; HttpOnly; Path=/; Max-Age=0`, `Refresh=; HttpOnly; Path=/; Max-Age=0`];
  }

  public setCurrentRefreshToken() {}
}
