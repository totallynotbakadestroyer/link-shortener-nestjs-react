import { Module } from '@nestjs/common';
import { ShortenedLinksService } from './shortened-links.service';
import { ShortenedLinksController } from './shortened-links.controller';
import { LinksModule } from '../links/links.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Visitor, VisitorSchema } from './schemas/visitor.schema';

@Module({
  providers: [ShortenedLinksService],
  controllers: [ShortenedLinksController],
  imports: [
    LinksModule,
    MongooseModule.forFeature([{ name: Visitor.name, schema: VisitorSchema }]),
  ],
})
export class ShortenedLinksModule {}
