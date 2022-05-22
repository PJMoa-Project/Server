import { ApiProperty } from '@nestjs/swagger';

export class GetProjectsMembers {
  @ApiProperty()
  readonly userId: number;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty()
  readonly isProjectOwner: boolean;
}

export class GetProjectsMembersResponseDto {
  @ApiProperty({ type: [GetProjectsMembers] })
  readonly members: GetProjectsMembers[];

  constructor(partial: Partial<GetProjectsMembersResponseDto>) {
    Object.assign(this, partial);
  }
}
