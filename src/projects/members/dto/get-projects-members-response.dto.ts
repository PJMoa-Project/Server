import { ApiProperty } from '@nestjs/swagger';

export class GetProjectsMembers {
  @ApiProperty()
  readonly userId: number;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty()
  readonly isOwner: boolean;
}

export class GetProjectsMembersResponseDto {
  @ApiProperty({ type: [GetProjectsMembers] })
  readonly members: GetProjectsMembers[] | null;

  constructor(partial: Partial<GetProjectsMembersResponseDto>) {
    Object.assign(this, partial);
  }
}
