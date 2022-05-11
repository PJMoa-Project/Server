import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { ProjectsMembers } from '@app/entity';

@Injectable()
@EntityRepository(ProjectsMembers)
export class ProjectsMembersRepository extends Repository<ProjectsMembers> {
  public addProjectMember(projectId: number, userId: number) {
    return this.insert({ projectId, userId });
  }

  public findProjectMemberByUserId(projectId: number, userId: number) {
    return this.createQueryBuilder('ProjectsMembers')
      .where('ProjectsMembers.projectId = :projectId', { projectId })
      .andWhere('ProjectsMembers.userId = :userId', { userId })
      .andWhere('ProjectsMembers.status = :status', { status: true })
      .getOne();
  }

  public getProjectMemberCount(projectId: number): Promise<number> {
    return this.createQueryBuilder('ProjectsMembers')
      .where('ProjectsMembers.projectId = :projectId', { projectId })
      .andWhere('ProjectsMembers.status = :status', { status: true })
      .getCount();
  }
}
