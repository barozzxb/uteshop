import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './schemas/genre.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: Genre.name, schema: GenreSchema }
      ])
    ],
  controllers: [GenresController],
  providers: [GenresService]
})
export class GenresModule {}
