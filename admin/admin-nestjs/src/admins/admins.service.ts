import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './schemas/admin.schema';

@Injectable()
export class AdminsService {

    constructor(
        @InjectModel(Admin.name)
        private adminModel: Model<Admin>,
    ) { }

    findByEmail(email: string) {
        return this.adminModel.findOne({ email });
    }

    create(data: Partial<Admin>) {
        return this.adminModel.create(data);
    }
}
