import { Injectable } from '@nestjs/common';
import { Favorites } from 'src/utils';
import { v4 as createUuid } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { Track } from '../entities/track.entity';
import { ITrackStore } from '../interfaces';

@Injectable()
class TracksStore extends Favorites implements ITrackStore {
  private tracks: { [key: string]: Track } = {};

  getTracks(): Track[] {
    return Object.values(this.tracks);
  }

  getTrackById(id: string): Track {
    return this.tracks[id];
  }

  createTrack(data: CreateTrackDto): Track {
    const id = createUuid();
    this.tracks = {
      ...this.tracks,
      [id]: { ...data, id },
    };
    return this.getTrackById(id);
  }

  updateTrack(id: string, data: UpdateTrackDto): Track {
    this.tracks = {
      ...this.tracks,
      [id]: {
        ...this.tracks[id],
        ...data,
      },
    };

    return this.tracks[id];
  }

  deleteTrack(id: string) {
    const { [id]: data, ...rest } = this.tracks;
    this.tracks = rest;
    return;
  }

  getFavorites() {
    return this.favorites.map((track) => this.tracks[track]);
  }
}

export default TracksStore;
