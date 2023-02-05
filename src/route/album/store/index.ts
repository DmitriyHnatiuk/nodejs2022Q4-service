import { Injectable } from '@nestjs/common';
import { v4 as createUuid } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { Album } from '../entities/album.entity';
import { IAlbumStore } from '../interfaces';
import { UpdateAlbumDto } from './../dto/update-album.dto';

@Injectable()
class AlbumsStore implements IAlbumStore {
  private albums: { [key: string]: Album } = {};
  private favorites = [];

  getAlbums(): Album[] {
    return Object.values(this.albums);
  }

  getAlbumById(id: string): Album {
    return this.albums[id];
  }

  createAlbum(data: CreateAlbumDto): Album {
    const id = createUuid();
    this.albums = {
      ...this.albums,
      [id]: { ...data, id },
    };
    return this.getAlbumById(id);
  }

  updateAlbum(id: string, data: UpdateAlbumDto): Album {
    this.albums = {
      ...this.albums,
      [id]: {
        ...this.albums[id],
        ...data,
      },
    };

    return this.albums[id];
  }

  deleteAlbum(id: string) {
    const { [id]: data, ...rest } = this.albums;
    this.albums = rest;
    return;
  }

  isFavorites(id: string): boolean {
    return this.favorites.includes(id);
  }

  getFavorites() {
    return this.favorites.map((album) => this.albums[album]);
  }

  addToFavorites(id: string) {
    return (this.favorites = [...new Set([...this.favorites, id])]);
  }

  deleteFromFavorites(id: string) {
    return (this.favorites = this.favorites.filter(
      (entryId) => entryId !== id,
    ));
  }
}

export default AlbumsStore;
