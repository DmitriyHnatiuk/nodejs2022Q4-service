import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AlbumModule } from './route/album/album.module';
import { ArtistModule } from './route/artist/artist.module';
import { FavsModule } from './route/favs/favs.module';
import { TrackModule } from './route/track/track.module';
import { UserModule } from './route/user/user.module';

@Module({
  imports: [
    AlbumModule,
    ArtistModule,
    TrackModule,
    UserModule,
    FavsModule,
    PrismaModule,
  ],
})
export class AppModule {}
