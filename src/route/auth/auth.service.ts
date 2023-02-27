import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

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

  generateAccessToken(payload: string | Buffer | object, secret: string) {
    const duration = tokenDuration[secret as string];
    return this.jwt.signAsync(payload, {
      expiresIn: duration,
      secret,
    });
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

  refresh(updateAuthDto: UpdateAuthDto) {
    console.log(updateAuthDto);
    const { refreshToken } = updateAuthDto;

    if (!refreshToken) {
      throw new HttpException(
        'Invalid authorizations',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return `refresh`;
  }
}
