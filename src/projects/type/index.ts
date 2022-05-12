import { ProjectsTechStacks } from '@app/entity';

export type GetProjectsTechStack = Omit<ProjectsTechStacks, 'projects'>;
