import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponseDto {
  @ApiProperty()
  accessToken: string;

  constructor(partial: Partial<LoginUserResponseDto>) {
    Object.assign(this, partial);
  }
}
