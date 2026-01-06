import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'admins' })
export class Admin extends Document {

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  fullName: string;

  @Prop({ default: false })
  isVerified: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
