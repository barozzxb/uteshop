import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductStatDocument = ProductStat & Document;

@Schema({ collection: 'productstats' })
export class ProductStat extends Document {
    @Prop({ required: true, unique: true })
    productsku: string;

    @Prop({ default: 0 })
    views: number;

    @Prop({ default: 0 })
    sold: number;
}

export const ProductStatSchema = SchemaFactory.createForClass(ProductStat);
