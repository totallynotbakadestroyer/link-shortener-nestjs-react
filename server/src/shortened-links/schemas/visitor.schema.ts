import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Link } from '../../links/schemas/link.schema';

export type VisitorDocuemnt = Visitor & Document;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Visitor {
  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  deviceType: string;

  @Prop()
  browser: string;

  @Prop()
  os: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Link', required: true })
  link: Link;
}

export const VisitorSchema = SchemaFactory.createForClass(Visitor);
