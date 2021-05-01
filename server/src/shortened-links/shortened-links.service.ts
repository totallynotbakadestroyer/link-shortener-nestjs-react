import { Injectable } from '@nestjs/common';
import { LinksService } from '../links/links.service';
import * as geoip from 'fast-geoip';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visitor, VisitorDocuemnt } from './schemas/visitor.schema';
import DeviceDetector = require('device-detector-js');

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

  async storeVisitor(linkId, ip, userAgent) {
    const deviceDetector = new DeviceDetector();
    const result = deviceDetector.parse(userAgent);
    const deviceInfo = {
      deviceType:
        result.device && result.device.type
          ? result.device.type
          : 'Unknown Device',
      browser:
        result.client && result.client.name
          ? result.client.name
          : 'Unknown Browser',
      os: result.os && result.os.name ? result.os.name : 'Unknown OS',
    };
    const geo = await geoip.lookup(ip);
    const geoInfo = {
      country: geo && geo.country ? geo.country : 'Unknown Country',
      city: geo && geo.city ? geo.city : 'Unknown City',
    };
    return this.visitorModel.create({
      ...geoInfo,
      ...deviceInfo,
      link: linkId,
    });
  }
}
