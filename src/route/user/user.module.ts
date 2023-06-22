import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
