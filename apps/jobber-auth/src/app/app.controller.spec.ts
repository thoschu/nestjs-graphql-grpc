import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', (): void => {
  let app: TestingModule;

  beforeAll(async (): Promise<void> => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', (): void => {
    it('should return "Hello API"', (): void => {
      const appController: AppController = app.get<AppController>(AppController);

      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
