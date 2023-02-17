import { Module } from '@nestjs/common';
import { PrismaModule } from './../../prisma/prisma.module';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  imports: [PrismaModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
