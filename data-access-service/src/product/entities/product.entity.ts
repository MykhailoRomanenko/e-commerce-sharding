import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop()
  name: string;
  @Prop()
  description?: string;
  @Prop({ type: Types.ObjectId, ref: 'categories' })
  category_id: string;
  @Prop()
  suppliers: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
