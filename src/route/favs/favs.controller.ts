import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { FavsService } from './favs.service';

@Controller('favs')
@UseGuards(JwtGuard)
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteTrack(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteArtist(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteAlbum(id);
  }
}
