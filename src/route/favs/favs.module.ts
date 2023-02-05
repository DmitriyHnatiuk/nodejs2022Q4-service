import { Module } from '@nestjs/common';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from './../track/track.module';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  imports: [AlbumModule, ArtistModule, TrackModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
