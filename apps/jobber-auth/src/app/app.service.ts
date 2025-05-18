import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getData(): Record<'message', string> {
    return { message: 'Hello API' };
  }
}
