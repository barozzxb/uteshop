import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GenreDocument = HydratedDocument<Genre>;

@Schema({ collection: 'genres' })
export class Genre {

    @Prop({ type: String, required: true })
    _id: string;

    @Prop()
    name: string;

    @Prop()
    description: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
