import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  _id: string;
  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
