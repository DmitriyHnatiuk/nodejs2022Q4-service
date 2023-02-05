import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { TrackService } from './../track/track.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import ArtistStore from './store';

@Injectable()
export class ArtistService {
  constructor(
    private artists: ArtistStore,
    private tracks: TrackService,
    private albums: AlbumService,
  ) {}

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
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    const isFavorites = this.artists.isFavorites(id);
    if (isFavorites) {
      this.artists.deleteFromFavorites(id);
    }

    const tracks = this.tracks.findAll();

    tracks.map((track) =>
      track.artistId === id
        ? this.tracks.update(track.id, { artistId: null })
        : track,
    );

    const albums = this.albums.findAll();

    albums.map((album) =>
      album.artistId === id
        ? this.albums.update(album.id, { artistId: null })
        : album,
    );

    return this.artists.deleteArtist(id);
  }

  getFavorites() {
    return this.artists.getFavorites();
  }

  addToFavorites(id: string) {
    const artist = this.artists.getArtistById(id);
    if (!artist) {
      throw new HttpException(
        "Artist doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.artists.addToFavorites(id);
  }

  deleteFromFavorites(id: string) {
    const isFavorites = this.artists.isFavorites(id);
    if (!isFavorites) {
      throw new HttpException('Artist is not favorite', HttpStatus.NOT_FOUND);
    }
    return this.artists.deleteFromFavorites(id);
  }
}
