import { OnOffLine, ProjectType } from '@app/entity';

export class GetProjectsDetailResponseDto {
  readonly id: number;

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

  readonly techStacks: string[];
}
