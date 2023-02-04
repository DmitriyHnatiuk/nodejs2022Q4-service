import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateUserDto } from '../interfaces';

export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
