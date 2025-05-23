import { Injectable } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {

  constructor(private readonly prismaService: PrismaService) {}

  public getData(): Record<'message', string> {
    const { message } = this.prismaService.getData();
    return { message: `Hello API by ${message}` };
  }
}
