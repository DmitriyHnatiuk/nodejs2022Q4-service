import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { ICreateAlbumDto } from '../interfaces';

export class CreateAlbumDto implements ICreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}
