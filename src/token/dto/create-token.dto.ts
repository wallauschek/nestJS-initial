import { IsString, IsDate, IsBoolean } from 'class-validator';
import { Token } from '../entities/token.entity';

export class CreateTokenDto extends Token {
  @IsString()
  userId: string;

  @IsString()
  refreshToken: string;

  @IsBoolean()
  valid: boolean;

  @IsDate()
  expiresDate: Date;
}
