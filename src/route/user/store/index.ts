import { Injectable } from '@nestjs/common';
import { v4 as createUuid } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { IUserStore } from '../interfaces';

@Injectable()
class UserStore implements IUserStore {
  private users: { [key: string]: User } = {};

  getUsers(): User[] {
    return Object.values(this.users);
  }

  getUserById(id: string): User {
    return this.users[id];
  }

  createUser(data: CreateUserDto): User {
    const id = createUuid();
    const createdAt = Date.now();
    this.users = {
      ...this.users,
      [id]: { ...data, id, createdAt, updatedAt: createdAt, version: 1 },
    };
    return this.getUserById(id);
  }

  updateUser(id: string, newPassword: string): User {
    this.users = {
      ...this.users,
      [id]: {
        ...this.users[id],
        password: newPassword,
        version: this.users[id].version + 1,
        updatedAt: Date.now(),
      },
    };

    return this.users[id];
  }

  deleteUser(id: string) {
    const { [id]: data, ...rest } = this.users;
    this.users = rest;
    return;
  }

  isIncludeData(id: string): boolean {
    return Boolean(this.users[id]);
  }
}

export default UserStore;
