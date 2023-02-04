import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface ICreateUserDto {
  login: string;
  password: string;
}

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface IUserStore {
  getUsers: () => User[];
  getUserById: (id: string) => User;
  createUser: (data: CreateUserDto) => User;
  updateUser: (id: string, newPassword: string) => User;
  deleteUser: (id: string) => void;
  isIncludeData: (id: string) => boolean;
}
