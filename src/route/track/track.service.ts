import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { CreateTrackDto, UpdateTrackDto } from './dto';
@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  create(createTrackDto: CreateTrackDto) {
    return this.prisma.track.create({ data: createTrackDto });
  }

  findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.track.update({ where: { id }, data: updateTrackDto });
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.track.delete({ where: { id } });
  }
}
