import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import AlbumsStore from './store';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumsStore],
  exports: [AlbumService],
})
export class AlbumModule {}
