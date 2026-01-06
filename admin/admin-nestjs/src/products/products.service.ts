import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private productModel: Model<Product>,
    ) { }

    findAll() {
        return this.productModel.find().exec();
    }

    create(data: Partial<Product>) {
        return this.productModel.create(data);
    }

    findById(id: string) {
        return this.productModel.findById(id).exec();
    }

    findBySku(sku: string){
        return this.productModel.findOne({sku}).exec();
    }

    update(id: string, data: Partial<Product>) {
        return this.productModel.findByIdAndUpdate(
            id,
            data,
            { new: true },
        );
    }

    async remove(id: string) {
        const deleted = await this.productModel.findByIdAndDelete(id);
        if (!deleted) throw new NotFoundException('Product not found');
        return deleted;
    }
}
