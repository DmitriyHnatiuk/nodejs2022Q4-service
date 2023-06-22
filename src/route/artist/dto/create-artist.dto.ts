import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ICreateArtistDto } from '../interfaces';

export class CreateArtistDto implements ICreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
