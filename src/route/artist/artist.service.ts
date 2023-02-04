import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import ArtistStore from './store';

@Injectable()
export class ArtistService {
  constructor(private artists: ArtistStore) {}

  create(createArtistDto: CreateArtistDto) {
    return this.artists.createArtist(createArtistDto);
  }

  findAll() {
    return this.artists.getArtists();
  }

  findOne(id: string) {
    const artist = this.artists.getArtistById(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id);
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    return this.artists.updateArtist(id, updateArtistDto);
  }

  remove(id: string) {
    const artist = this.findOne(id);
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    return this.artists.deleteArtist(id);
  }
}
