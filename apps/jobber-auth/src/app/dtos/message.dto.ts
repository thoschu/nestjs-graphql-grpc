import { IsInt, IsString } from 'class-validator';

export class MessageDto {
  @IsInt()
  public readonly nonce: number;

  @IsString()
  public readonly message: string;
}
