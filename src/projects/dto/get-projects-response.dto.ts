import { OnOffLine, ProjectType } from '@app/entity';

export class GetProjects {
  readonly projectId: number;

  readonly title: string;

  readonly projectType: ProjectType;

  readonly onOffLine: OnOffLine;

  readonly region: string | null;

  readonly memberCount: number;

  readonly maxPeople: number;

  readonly startDate: Date;

  readonly endDate: Date;
}

export class GetProjectsResponseDto {
  readonly projects: GetProjects[];
}
