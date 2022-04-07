import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserRequestDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @IsNotEmpty()
  @IsString()
  readonly iat: number;

  @IsNotEmpty()
  @IsString()
  readonly exp: number;
}
