import { IsString } from 'class-validator';
import { Token } from '../entities/token.entity';

export class CreateTokenDto extends Token {
  @IsString()
  userId: string;
}
