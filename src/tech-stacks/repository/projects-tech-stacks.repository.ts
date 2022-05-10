import { EntityRepository, Repository } from 'typeorm';

import { ProjectsTechStacks } from '@app/entity';

@EntityRepository(ProjectsTechStacks)
export class ProjectsTechStacksRepository extends Repository<ProjectsTechStacks> {
  public createTechStacks(projectId: number, stacks: string[]) {
    return this.insert(
      stacks.map((stack: string) => ({
        projectId,
        name: stack,
      })),
    );
  }

  public deleteTechStack(techStackId: number) {
    return this.createQueryBuilder()
      .delete()
      .from(ProjectsTechStacks)
      .where('id = :techStackId', { techStackId })
      .execute();
  }

  public createTechStack(projectId: number, name: string) {
    return this.createQueryBuilder()
      .insert()
      .into(ProjectsTechStacks)
      .values({ projectId, name })
      .execute();
  }
}
