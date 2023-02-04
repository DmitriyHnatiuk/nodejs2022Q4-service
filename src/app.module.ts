import { Module } from '@nestjs/common';
import { AlbumModule } from './route/album/album.module';
import { ArtistModule } from './route/artist/artist.module';

@Module({
  imports: [ArtistModule, AlbumModule],
})
export class AppModule {}
