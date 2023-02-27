import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [PrismaModule],
  controllers: [ArtistController],
  providers: [ArtistService, JwtStrategy],
})
export class ArtistModule {}
