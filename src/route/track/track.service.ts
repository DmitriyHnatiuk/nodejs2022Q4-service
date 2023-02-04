import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import TracksStore from './store';

@Injectable()
export class TrackService {
  constructor(private tracks: TracksStore) {}

  create(createTrackDto: CreateTrackDto) {
    return this.tracks.createTrack(createTrackDto);
  }

  findAll() {
    return this.tracks.getTracks();
  }

  findOne(id: string) {
    const track = this.tracks.getTrackById(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return this.tracks.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    const track = this.findOne(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return this.tracks.deleteTrack(id);
  }
}
