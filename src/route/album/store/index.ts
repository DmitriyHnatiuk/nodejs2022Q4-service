import { Injectable } from '@nestjs/common';
import { v4 as createUuid } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { Album } from '../entities/album.entity';
import { IAlbumStore } from '../interfaces';
import { UpdateAlbumDto } from './../dto/update-album.dto';

@Injectable()
class AlbumsStore implements IAlbumStore {
  private albums: { [key: string]: Album } = {};

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

  isIncludeData(id: string): boolean {
    return Boolean(this.albums[id]);
  }
}

export default AlbumsStore;
