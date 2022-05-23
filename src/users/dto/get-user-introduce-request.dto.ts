import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserIntroduceParamRequestDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}
