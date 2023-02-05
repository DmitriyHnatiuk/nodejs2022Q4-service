import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Album } from '../entities/album.entity';

export interface ICreateAlbumDto {
  name: string;
  year: number;
  artistId: string | null;
}

export interface IAlbumStore {
  getAlbums: () => Album[];
  getAlbumById: (id: string) => Album;
  createAlbum: (data: CreateAlbumDto) => Album;
  updateAlbum: (id: string, data: UpdateAlbumDto) => Album;
  deleteAlbum: (id: string) => void;
  isFavorites: (id: string) => boolean;
  addToFavorites: (id: string) => string[];
  deleteFromFavorites: (id: string) => void;
  getFavorites: () => Album[];
}
