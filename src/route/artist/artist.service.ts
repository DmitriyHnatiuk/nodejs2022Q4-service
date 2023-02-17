import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtistDto, UpdateArtistDto } from './dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  create(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({ data: createArtistDto });
  }

  findAll() {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.artist.update({ where: { id }, data: updateArtistDto });
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.artist.delete({ where: { id } });
  }
}
