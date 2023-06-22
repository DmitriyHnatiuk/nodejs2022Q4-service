import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { Track } from '../entities/track.entity';

export interface ICreateTrackDto {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface ITrackStore {
  getTracks: () => Track[];
  getTrackById: (id: string) => Track;
  createTrack: (data: CreateTrackDto) => Track;
  updateTrack: (id: string, data: UpdateTrackDto) => Track;
  deleteTrack: (id: string) => void;
  isFavorites: (id: string) => boolean;
  addToFavorites: (id: string) => string[];
  deleteFromFavorites: (id: string) => void;
  getFavorites: () => Track[];
}
