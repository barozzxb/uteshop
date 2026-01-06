import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Account, AccountSchema } from './schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [MongooseModule]
})
export class UsersModule { }
