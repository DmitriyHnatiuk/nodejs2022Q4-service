import { Injectable } from '@nestjs/common';
import { v4 as createUuid } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../entities/artist.entity';
import { IArtistStore } from '../interfaces';

@Injectable()
class ArtistStore implements IArtistStore {
  private artist: { [key: string]: Artist } = {};

  getArtists(): Artist[] {
    return Object.values(this.artist);
  }

  getArtistById(id: string): Artist {
    return this.artist[id];
  }

  createArtist(data: CreateArtistDto): Artist {
    const id = createUuid();
    this.artist = {
      ...this.artist,
      [id]: { ...data, id },
    };
    return this.getArtistById(id);
  }

  updateArtist(id: string, data: UpdateArtistDto): Artist {
    this.artist = {
      ...this.artist,
      [id]: {
        ...this.artist[id],
        ...data,
      },
    };

    return this.artist[id];
  }

  deleteArtist(id: string) {
    const { [id]: data, ...rest } = this.artist;
    this.artist = rest;
    return;
  }

  isIncludeData(id: string): boolean {
    return Boolean(this.artist[id]);
  }
}

export default ArtistStore;
