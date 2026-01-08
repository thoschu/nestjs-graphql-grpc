import { Injectable } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {


  constructor(private readonly prismaService: PrismaService) {

  }

  public getData() {
    // MessageEntity
    // Active Record: „Ich bin die Daten und weiß, wie ich mich speichere.“
    // Data Mapper: „Ich bin nur die Daten – jemand anderes speichert mich.“
    return 'xxxxxxxx';
  }
}
