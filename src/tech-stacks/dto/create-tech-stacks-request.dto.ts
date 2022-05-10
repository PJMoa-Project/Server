import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTechStacksRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly projectId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
