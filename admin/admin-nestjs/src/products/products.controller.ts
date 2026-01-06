import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('admin/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    create(@Body() body) {
        return this.productsService.create(body);
    }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':sku') 
    findBySku(@Param('sku') sku: string) {
        return this.productsService.findBySku(sku);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() body,
    ) {
        return this.productsService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }
}
