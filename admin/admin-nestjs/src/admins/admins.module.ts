import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schemas/admin.schema';

@Module({
   imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema }
    ])
  ],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
