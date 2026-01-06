import {
    Controller,
    Get,
    Param,
    Patch,
    Delete,
    Body,
    Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('admin/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsers(@Query() query: any) {
        return this.usersService.findAll(query);
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @Patch(':id')
    updateUser(
        @Param('id') id: string,
        @Body() body: any,
    ) {
        return this.usersService.update(id, body);
    }

    @Patch(':id/status')
    toggleStatus(@Param('id') id: string) {
        return this.usersService.toggleStatus(id);
    }

    @Patch(':id/role')
    changeRole(
        @Param('id') id: string,
        @Body('role') role: string,
    ) {
        return this.usersService.changeRole(id, role);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
