import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './schemas/genre.schema';

@Injectable()
export class GenresService {
    constructor(
        @InjectModel(Genre.name)
        private genreModel: Model<Genre>,
    ) { }

    create(data: Partial<Genre>) {
        return this.genreModel.create(data);
    }

    findAll(){
        return this.genreModel.find().exec();
    }

    findById(id: string) {
        return this.genreModel.findById(id).exec();
    }

    update(id: string, data: Partial<Genre>) {
        return this.genreModel.findByIdAndUpdate(
            id,
            data,
            { new: true },
        );
    }

    async remove(id: string) {
        const deleted = await this.genreModel.findByIdAndDelete(id);
        if (!deleted) throw new NotFoundException('Genre not found');
        return deleted;
    }
}
