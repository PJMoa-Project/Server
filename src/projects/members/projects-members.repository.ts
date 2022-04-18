import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { ProjectsMembers } from '@app/entity';

@Injectable()
@EntityRepository(ProjectsMembers)
export class ProjectsMembersRepository extends Repository<ProjectsMembers> {
  public addProjectMember(projectId: number, userId: number) {
    return this.insert({ projectId, userId });
  }
}
