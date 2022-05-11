import { OnOffLine, ProjectType } from '@app/entity';

export class GetProjectsDetailResponseDto {
  readonly projectId: number;

  readonly title: string;

  readonly contents: string;

  readonly type: ProjectType;

  readonly onOffLine: OnOffLine;

  readonly region: string | null;

  readonly maxPeopleCount: number;

  readonly memberCount: number;

  readonly likeCount: number;

  readonly startDate: Date;

  readonly endDate: Date;

  readonly ownerName: string;

  readonly gitUrl: string | null;

  readonly aboutMe: string | null;

  readonly techStacks: string[];

  constructor(partial: Partial<GetProjectsDetailResponseDto>) {
    Object.assign(this, partial);
  }
}
