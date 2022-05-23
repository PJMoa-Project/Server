import { ApiProperty } from '@nestjs/swagger';

export class GetUserIntroduce {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly profileImage: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly aboutMe: string;

  @ApiProperty()
  readonly gitUrl: string;
}

export class GetUserIntroduceResponseDto {
  @ApiProperty({ type: GetUserIntroduce })
  readonly user: GetUserIntroduce;

  constructor(partial: Partial<GetUserIntroduceResponseDto>) {
    Object.assign(this, partial);
  }
}
