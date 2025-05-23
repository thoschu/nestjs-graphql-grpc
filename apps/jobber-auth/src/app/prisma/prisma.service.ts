import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma-clients/jobber-auth';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private static readonly TEXT: string = 'Tom S.';

  constructor() {
    super();
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  public getData(): Record<'message', string> {
    return { message: PrismaService.TEXT };
  }
}
