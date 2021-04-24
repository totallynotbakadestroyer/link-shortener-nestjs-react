import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type LinkDocuemnt = Link & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Link {
  @Prop({ required: true })
  to: string;

  @Prop({ required: true, unique: true })
  shortenedLink: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: User;
}

export const LinkSchema = SchemaFactory.createForClass(Link);

LinkSchema.virtual('visitors', {
  ref: 'Visitor',
  localField: '_id',
  foreignField: 'link',
  justOne: false,
});
