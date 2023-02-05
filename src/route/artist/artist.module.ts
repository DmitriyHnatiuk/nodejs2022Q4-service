import { Module } from '@nestjs/common';

import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import ArtistStore from './store';

@Module({
  imports: [TrackModule, AlbumModule],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistStore],
  exports: [ArtistService],
})
export class ArtistModule {}
