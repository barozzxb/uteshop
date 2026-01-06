import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductStat, ProductStatSchema } from './schemas/product-stat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductStat.name, schema: ProductStatSchema },
    ])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [MongooseModule],
})
export class ProductsModule { }
