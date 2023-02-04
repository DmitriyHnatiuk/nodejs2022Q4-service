import { Module } from '@nestjs/common';
import { AlbumModule } from './route/album/album.module';
import { ArtistModule } from './route/artist/artist.module';
import { TrackModule } from './route/track/track.module';

@Module({
  imports: [ArtistModule, AlbumModule, TrackModule],
})
export class AppModule {}
