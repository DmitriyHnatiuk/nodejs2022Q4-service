import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import ArtistStore from './store';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistStore],
  exports: [ArtistService],
})
export class ArtistModule {}
