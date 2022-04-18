import { EntityRepository, Repository } from 'typeorm';

import { ProjectsTechStacks } from '@app/entity';

@EntityRepository(ProjectsTechStacks)
export class ProjectsTechStacksRepository extends Repository<ProjectsTechStacks> {
  public createTechStacks(projectId: number, stacks: string[]) {}
}
