import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ _id: false })
export class Image {
    @Prop()
    url: string;

    @Prop()
    alt: string;
}
const ImageSchema = SchemaFactory.createForClass(Image);

@Schema({ timestamps: true, collection: 'products' })
export class Product extends Document {

    @Prop({ required: true, unique: true })
    sku: string;

    @Prop()
    name: string;

    @Prop({ type: String, ref: 'genre' })
    genre: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    originalPrice: number;

    @Prop({ type: [ImageSchema] })
    images: Image[];

    @Prop()
    avatar: string;

    @Prop()
    brand: string;

    @Prop({ default: 0 })
    rating: number;

    @Prop({ default: 0 })
    stock: number;

    @Prop({ default: 0 })
    salesCount: number;

    @Prop({ default: 0 })
    commentCount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ genre: 1, createdAt: -1 });
