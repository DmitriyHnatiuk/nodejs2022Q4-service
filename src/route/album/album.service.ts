import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import AlbumsStore from './store';

@Injectable()
export class AlbumService {
  constructor(private albums: AlbumsStore) {}

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
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    return this.albums.deleteAlbum(id);
  }
}
