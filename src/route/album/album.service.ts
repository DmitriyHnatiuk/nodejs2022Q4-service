import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.prisma.album.create({ data: createAlbumDto });
  }

  findAll() {
    return this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.album.update({ where: { id }, data: updateAlbumDto });
  }

  async remove(id: string) {
    const album = await this.findOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.album.delete({ where: { id } });
  }
}
