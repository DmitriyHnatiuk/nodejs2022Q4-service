import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserStore from './store';

@Injectable()
export class UserService {
  constructor(private users: UserStore) {}

  create(createUserDto: CreateUserDto) {
    return this.users.createUser(createUserDto);
  }

  findAll() {
    return this.users.getUsers();
  }

  findOne(id: string) {
    const user = this.users.getUserById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { newPassword, oldPassword } = updateUserDto;
    const user = this.findOne(id);

    if (oldPassword !== user.password) {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return this.users.updateUser(id, newPassword);
  }

  remove(id: string) {
    const user = this.findOne(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return this.users.deleteUser(id);
  }
}
