import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [PrismaModule],
  controllers: [TrackController],
  providers: [TrackService, JwtStrategy],
})
export class TrackModule {}
