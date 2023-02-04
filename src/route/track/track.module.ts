import { Module } from '@nestjs/common';
import TracksStore from './store';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TracksStore],
  exports: [TrackService],
})
export class TrackModule {}
