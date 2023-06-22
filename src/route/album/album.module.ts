import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [PrismaModule],
  controllers: [AlbumController],
  providers: [AlbumService, JwtStrategy],
})
export class AlbumModule {}
