-- AlterTable
ALTER TABLE "album"."Album" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "artist"."Artist" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "track"."Track" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;
