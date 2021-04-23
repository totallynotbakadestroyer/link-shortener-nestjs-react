import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';

export type LinkDocuemnt = Link & Document;

@Schema()
export class Link {
  @Prop({ required: true })
  to: string;

  @Prop({ required: true, unique: true })
  shortenedLink: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: User;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
