import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

import { Order, OrderSchema } from '../orders/schemas/order.schema';
import { Account, AccountSchema } from '../users/schemas/account.schema';
import { ProductStat, ProductStatSchema } from '../products/schemas/product-stat.schema';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    OrdersModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Account.name, schema: AccountSchema },
      { name: ProductStat.name, schema: ProductStatSchema },
    ]),
  ],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
