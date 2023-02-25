import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  protected generatePasswordHash(password: string) {
    return hash(password, Number(process.env.CRYPT_SALT));
  }

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const _hashedPassword = await this.generatePasswordHash(password);
    return this.prisma.user.create({
      data: { login, password: _hashedPassword },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { newPassword, oldPassword } = updateUserDto;

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isValidPassword = await compare(oldPassword, user.password);

    if (!isValidPassword) {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }

    const _hashedPassword = await this.generatePasswordHash(newPassword);

    return this.prisma.user.update({
      where: { id },
      data: { password: _hashedPassword, version: { increment: 1 } },
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.user.delete({ where: { id } });
  }
}
