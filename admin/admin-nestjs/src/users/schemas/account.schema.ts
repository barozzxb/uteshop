import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema({ collection: 'accounts' })
export class Account extends Document {

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ default: 'USER' })
    role: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: false })
    status: boolean;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    phonenumber: string;

    @Prop()
    address: string;

    @Prop()
    gender: string;

    @Prop()
    dob: Date;

    @Prop()
    avatar: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
