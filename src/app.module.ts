import { Module } from '@nestjs/common';
import { AlbumModule } from './route/album/album.module';
import { ArtistModule } from './route/artist/artist.module';
import { TrackModule } from './route/track/track.module';
import { UserModule } from './route/user/user.module';

@Module({
  imports: [AlbumModule, ArtistModule, TrackModule, UserModule],
})
export class AppModule {}
