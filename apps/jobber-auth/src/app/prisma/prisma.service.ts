import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '../../../generated/prisma/client';

import 'dotenv/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private static readonly DB_CONNECTION_STRING: string = `${process.env.DATABASE_URL}`

  constructor() {
    super({
      adapter: new PrismaPg({
        connectionString: PrismaService.DB_CONNECTION_STRING
      })
    });
  }

  public async onModuleInit(): Promise<void> {
    const allUsers = await this.user.findMany({
      include: {
        jobs: true
      }
    });

    console.log('All users:', JSON.stringify(allUsers, null, 2));
  }
}
