import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { JsonWebTokenError } from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';
import { tokenDuration } from 'src/utils';
import { UserService } from './../user/user.service';
import { CreateAuthDto, UpdateAuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private user: UserService,
    private prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  generateAccessToken(payload: string | object, secret: string) {
    const duration = tokenDuration[secret as string];
    const options = {
      expiresIn: duration,
      secret,
    };

    this.jwt.signAsync(JSON.stringify(payload), options);
  }

  create(createAuthDto: CreateAuthDto) {
    return this.user.create(createAuthDto);
  }

  async login(createAuthDto: CreateAuthDto) {
    const { login, password } = createAuthDto;
    const users = await this.prisma.user.findMany({
      where: { login },
    });

    const [user] = await users.reduce(async (promise, _user) => {
      const isActualUser = await compare(password, _user.password);
      const acc = await promise;
      if (!isActualUser) {
        return acc;
      }
      return [...acc, _user];
    }, Promise.resolve([] as const));

    if (!user) {
      throw new HttpException('User not found', HttpStatus.FORBIDDEN);
    }

    const payload = { sub: user.id, login: user.login };
    const accessToken = await this.generateAccessToken(
      payload,
      process.env.JWT_SECRET_KEY,
    );
    const refreshToken = await this.generateAccessToken(
      payload,
      process.env.JWT_SECRET_REFRESH_KEY,
    );

    return { accessToken, refreshToken };
  }

  async refresh(updateAuthDto: UpdateAuthDto) {
    if (!updateAuthDto.refreshToken) {
      throw new HttpException(
        'Invalid authorizations',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const data = await this.jwt.verify(updateAuthDto.refreshToken, {
        ignoreExpiration: false,
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      const user = await this.prisma.user.findUnique({
        where: { id: data.sub },
      });

      if (!user) {
        throw new JsonWebTokenError('Error');
      }

      const payload = { sub: data.sub, login: data.login };
      const accessToken = await this.generateAccessToken(
        payload,
        process.env.JWT_SECRET_KEY,
      );
      const refreshToken = await this.generateAccessToken(
        payload,
        process.env.JWT_SECRET_REFRESH_KEY,
      );

      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new ForbiddenException('Invalid refresh token');
      }
      throw error;
    }
  }
}
