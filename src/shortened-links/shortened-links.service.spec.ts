import { Test, TestingModule } from '@nestjs/testing';
import { ShortenedLinksService } from './shortened-links.service';

describe('ShortenedLinksService', () => {
  let service: ShortenedLinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortenedLinksService],
    }).compile();

    service = module.get<ShortenedLinksService>(ShortenedLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
