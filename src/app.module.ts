import { Module } from '@nestjs/common';
import { AlbumModule } from './route/album/album.module';

@Module({
  imports: [AlbumModule],
})
export class AppModule {}
