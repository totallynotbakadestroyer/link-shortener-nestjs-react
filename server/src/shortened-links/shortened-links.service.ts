import { Injectable } from '@nestjs/common';
import { LinksService } from '../links/links.service';
import * as geoip from 'fast-geoip';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visitor, VisitorDocuemnt } from './schemas/visitor.schema';

@Injectable()
export class ShortenedLinksService {
  constructor(
    private linksService: LinksService,
    @InjectModel(Visitor.name)
    private readonly visitorModel: Model<VisitorDocuemnt>,
  ) {}
  async redirect(shortenedLink: string) {
    return this.linksService.findOneByShortenedLink(shortenedLink);
  }

  async storeVisitor(linkId, ip) {
    console.log(ip);
    const geo = await geoip.lookup(ip);
    const country = geo ? geo.country : 'Unknown Country';
    const city = geo ? geo.city : 'Unknown City';
    return this.visitorModel.create({ country, city, link: linkId });
  }
}
