import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', (): void => {
  let service: AppService;

  beforeAll(async (): Promise<void> => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', (): void => {
    it('should return "Hello API"', () : void=> {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
