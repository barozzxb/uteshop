import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { GenresModule } from './genres/genres.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => ({
      uri: config.get('MONGODB_URI'),
    }),
    inject: [ConfigService],
  }),
  AdminsModule,
  AuthModule,
  ProductsModule,
  GenresModule,
  UsersModule,
  OrdersModule,
  DashboardModule,],
  controllers: [AppController, DashboardController],
  providers: [AppService, DashboardService],
})
export class AppModule { }
