import { Module } from '@nestjs/common';

import UserStore from './store';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserStore],
})
export class UserModule {}
