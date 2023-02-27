import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { SerializeUser } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateAuthDto, UpdateAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createAuthDto: CreateAuthDto) {
    const user = await this.authService.create(createAuthDto);
    return new SerializeUser(user);
  }

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('refresh')
  refresh(@Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.refresh(updateAuthDto);
  }
}
