import { User } from '../../../generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty()
  name: string;
  id: number;
  email: string;
  password: string;
  createdAt: Date;
}
