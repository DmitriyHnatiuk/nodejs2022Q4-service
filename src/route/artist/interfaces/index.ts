import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../entities/artist.entity';

export interface ICreateArtistDto {
  name: string;
  grammy: boolean;
}

export interface IArtistStore {
  getArtists: () => Artist[];
  getArtistById: (id: string) => Artist;
  createArtist: (data: CreateArtistDto) => Artist;
  updateArtist: (id: string, data: UpdateArtistDto) => Artist;
  deleteArtist: (id: string) => void;
  isFavorites: (id: string) => boolean;
  addToFavorites: (id: string) => string[];
  deleteFromFavorites: (id: string) => void;
  getFavorites: () => Artist[];
}
