import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { ICreateTrackDto } from '../interfaces';

export class CreateTrackDto implements ICreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;
  @IsNotEmpty()
  @IsInt()
  duration: number;
}
