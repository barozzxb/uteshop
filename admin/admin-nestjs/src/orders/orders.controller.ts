import {
    Controller,
    Get,
    Param,
    Patch,
    Body,
    Query,
    BadRequestException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('admin/orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    getOrders(@Query() query: any) {
        return this.ordersService.findAll(query);
    }

    @Get(':id')
    getOrder(@Param('id') id: string) {
        return this.ordersService.findById(id);
    }

    @Patch(':id/status')
    updateStatus(
        @Param('id') id: string,
        @Body() dto: UpdateOrderStatusDto,
    ) {
        return this.ordersService.updateStatus(id, dto.status);
    }
}
