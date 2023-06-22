import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggingModule } from './logging/logging.module';
import { LoggingMiddleware } from './middleware';
import { PrismaModule } from './prisma/prisma.module';
import { AlbumModule } from './route/album/album.module';
import { ArtistModule } from './route/artist/artist.module';
import { AuthModule } from './route/auth/auth.module';
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
    AuthModule,
    LoggingModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
