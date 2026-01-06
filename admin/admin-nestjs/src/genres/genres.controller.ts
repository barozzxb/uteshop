import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GenresService } from './genres.service';

@Controller('admin/genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) { }

    @Post()
    create(@Body() body) {
        return this.genresService.create(body);
    }
    @Get()
    findAll() {
        return this.genresService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.genresService.findById(id);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() body,
    ) {
        return this.genresService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.genresService.remove(id);
    }
}
