import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import AlbumsStore from './store';

@Injectable()
export class AlbumService {
  constructor(private albums: AlbumsStore, private tracks: TrackService) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.albums.createAlbum(createAlbumDto);
  }

  findAll() {
    return this.albums.getAlbums();
  }

  findOne(id: string) {
    const album = this.albums.getAlbumById(id);
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return this.albums.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    const album = this.findOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    const isFavorites = this.albums.isFavorites(id);
    if (isFavorites) {
      this.albums.deleteFromFavorites(id);
    }

    const tracks = this.tracks.findAll();

    tracks.map((track) =>
      track.albumId === id
        ? this.tracks.update(track.id, { albumId: null })
        : track,
    );

    return this.albums.deleteAlbum(id);
  }

  getFavorites() {
    return this.albums.getFavorites();
  }

  addToFavorites(id: string) {
    const album = this.albums.getAlbumById(id);
    if (!album) {
      throw new HttpException(
        "Album doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.albums.addToFavorites(id);
  }

  deleteFromFavorites(id: string) {
    const album = this.albums.isFavorites(id);
    if (!album) {
      throw new HttpException('Albums is not favorite', HttpStatus.NOT_FOUND);
    }
    return this.albums.deleteFromFavorites(id);
  }
}
