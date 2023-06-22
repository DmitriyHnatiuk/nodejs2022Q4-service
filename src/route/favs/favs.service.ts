import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ERROR_NOT_FOUND } from 'src/const';
import { excludeFields } from 'src/utils';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const artists = await this.prisma.artist.findMany({
      where: { isFavorite: true },
      select: excludeFields('Artist', ['isFavorite']),
    });
    const tracks = await this.prisma.track.findMany({
      where: { isFavorite: true },
      select: excludeFields('Track', ['isFavorite']),
    });
    const albums = await this.prisma.album.findMany({
      where: { isFavorite: true },
      select: excludeFields('Album', ['isFavorite']),
    });

    return { artists, tracks, albums };
  }

  async addTrack(id: string) {
    try {
      await this.prisma.track.findUniqueOrThrow({ where: { id } });

      await this.prisma.track.update({
        where: { id },
        data: { isFavorite: true },
      });
      return;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === ERROR_NOT_FOUND
      ) {
        throw new HttpException(
          'Track not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      throw error;
    }
  }

  async deleteTrack(id: string) {
    try {
      await this.prisma.track.findFirstOrThrow({ where: { id } });
      await this.prisma.track.update({
        where: { id },
        data: { isFavorite: false },
      });
      return;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === ERROR_NOT_FOUND
      ) {
        throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }

  async addArtist(id: string) {
    try {
      await this.prisma.artist.findFirstOrThrow({ where: { id } });
      await this.prisma.artist.update({
        where: { id },
        data: { isFavorite: true },
      });
      return;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === ERROR_NOT_FOUND
      ) {
        throw new HttpException(
          'Artist not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      throw error;
    }
  }

  async deleteArtist(id: string) {
    try {
      await this.prisma.artist.findFirstOrThrow({ where: { id } });
      await this.prisma.artist.update({
        where: { id },
        data: { isFavorite: false },
      });
      return;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === ERROR_NOT_FOUND
      ) {
        throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }

  async addAlbum(id: string) {
    try {
      await this.prisma.album.findFirstOrThrow({ where: { id } });
      await this.prisma.album.update({
        where: { id },
        data: { isFavorite: true },
      });
      return;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === ERROR_NOT_FOUND
      ) {
        throw new HttpException(
          'Album not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      throw error;
    }
  }

  async deleteAlbum(id: string) {
    try {
      await this.prisma.album.findFirstOrThrow({ where: { id } });
      await this.prisma.album.update({
        where: { id },
        data: { isFavorite: false },
      });
      return;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === ERROR_NOT_FOUND
      ) {
        throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
