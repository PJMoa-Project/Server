import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export abstract class PageRequestDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  readonly pageNo: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  readonly pageSize: number;

  getOffset(): number {
    return (this.pageNo - 1) * this.pageSize;
  }

  getLimit(): number {
    return this.pageSize;
  }
}
