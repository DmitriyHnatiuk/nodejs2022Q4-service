import { Module } from '@nestjs/common';

import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import AlbumsStore from './store';

@Module({
  imports: [TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumsStore],
  exports: [AlbumService],
})
export class AlbumModule {}
