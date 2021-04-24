import { Test, TestingModule } from '@nestjs/testing';
import { ShortenedLinksController } from './shortened-links.controller';

describe('ShortenedLinksController', () => {
  let controller: ShortenedLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenedLinksController],
    }).compile();

    controller = module.get<ShortenedLinksController>(ShortenedLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
