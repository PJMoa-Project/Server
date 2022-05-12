import { OnOffLine, ProjectsTechStacks, ProjectType } from '@app/entity';

export type GetProjectsTechStack = Omit<ProjectsTechStacks, 'projects'>;

export interface IGetProjectParam {
  page: number;

  pageSize: number;

  personnel?: number;

  region?: string;

  projectType?: ProjectType;

  onOffLine?: OnOffLine;
}
