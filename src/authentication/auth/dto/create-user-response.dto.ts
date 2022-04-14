import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CreateUserResponseDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  @Exclude()
  readonly password: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly mobile: string;

  constructor(partial: Partial<CreateUserResponseDto>) {
    Object.assign(this, partial);
  }
}
