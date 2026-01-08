import { Controller, Get, HttpCode, HttpStatus, Logger, Response } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { Response as Res } from 'express';

import { AppService } from './app.service';
// import { MessageDto } from './dtos/message.dto';

@Controller()
export class AppController {
  private readonly logger: Logger = new Logger(AppController.name)

  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record'
  })
  public getMessages() {
    const payload = this.appService.getData();

    this.logger.log(payload, 'foo');

    return payload;
  }

  @Get('nonce')
  @ApiResponse({
    status: 204,
    description: 'The found nonce'
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  public getNonce(@Response() res: Res) {
    const nonce: number = 13071977;

    res.set({ 'x-nonce': nonce });

    return res.sendStatus(HttpStatus.NO_CONTENT);
  }
}
