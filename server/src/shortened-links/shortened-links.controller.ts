import { Controller, Get, Param, Response } from '@nestjs/common';
import { ShortenedLinksService } from './shortened-links.service';
import { IpAddress } from '../decorators/ip-address.decorator';
import { UserAgent } from '../decorators/user-agent.decorator';

@Controller('r')
export class ShortenedLinksController {
  constructor(private readonly shortenedLinksService: ShortenedLinksService) {}
  @Get(':shortenedLink')
  async redirect(
    @Param('shortenedLink') shortenedLink: string,
    @Response() res,
    @IpAddress() ip,
    @UserAgent() userAgent,
  ) {
    const { id, to } = await this.shortenedLinksService.redirect(shortenedLink);
    this.shortenedLinksService.storeVisitor(id, ip, userAgent);
    res.redirect(to);
  }
}
