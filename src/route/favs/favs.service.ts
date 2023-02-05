import { Injectable } from '@nestjs/common';

import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavsService {
  constructor(
    private tracks: TrackService,
    private artists: ArtistService,
    private albums: AlbumService,
  ) {}

  findAll() {
    const artists = this.artists.getFavorites();
    const tracks = this.tracks.getFavorites();
    const albums = this.albums.getFavorites();
    return { artists, tracks, albums };
  }

  addTrack(id: string) {
    return this.tracks.addToFavorites(id);
  }

  deleteTrack(id: string) {
    return this.tracks.deleteFromFavorites(id);
  }

  addArtist(id: string) {
    return this.artists.addToFavorites(id);
  }

  deleteArtist(id: string) {
    return this.artists.deleteFromFavorites(id);
  }

  addAlbum(id: string) {
    return this.albums.addToFavorites(id);
  }

  deleteAlbum(id: string) {
    return this.albums.deleteFromFavorites(id);
  }
}
