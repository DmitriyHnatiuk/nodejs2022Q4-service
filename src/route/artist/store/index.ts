import { Injectable } from '@nestjs/common';
import { v4 as createUuid } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../entities/artist.entity';
import { IArtistStore } from '../interfaces';

@Injectable()
class ArtistStore implements IArtistStore {
  private artists: { [key: string]: Artist } = {};
  private favorites = [];

  getArtists(): Artist[] {
    return Object.values(this.artists);
  }

  getArtistById(id: string): Artist {
    return this.artists[id];
  }

  createArtist(data: CreateArtistDto): Artist {
    const id = createUuid();
    this.artists = {
      ...this.artists,
      [id]: { ...data, id },
    };
    return this.getArtistById(id);
  }

  updateArtist(id: string, data: UpdateArtistDto): Artist {
    this.artists = {
      ...this.artists,
      [id]: {
        ...this.artists[id],
        ...data,
      },
    };

    return this.artists[id];
  }

  deleteArtist(id: string) {
    const { [id]: data, ...rest } = this.artists;
    this.artists = rest;
    return;
  }

  isFavorites(id: string): boolean {
    return this.favorites.includes(id);
  }

  getFavorites() {
    return this.favorites.map((artist) => this.artists[artist]);
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

export default ArtistStore;
