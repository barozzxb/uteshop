import { IsEnum } from 'class-validator';
import { OrderStatus } from '../constants/order-status';

export class UpdateOrderStatusDto {
    @IsEnum(OrderStatus)
    status: OrderStatus;
}
