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
    const query = this.createQueryBuilder('ProjectsMembers')
      .where('ProjectsMembers.projectId = :projectId', { projectId })
      .andWhere('ProjectsMembers.userId = :userId', { userId })
      .andWhere('ProjectsMembers.status = :status', { status: true });

    return query.getOne();
  }

  public getProjectMemberCount(projectId: number): Promise<number> {
    const query = this.createQueryBuilder('ProjectsMembers')
      .where('ProjectsMembers.projectId = :projectId', { projectId })
      .andWhere('ProjectsMembers.status = :status', { status: true });

    return query.getCount();
  }

  public getUserProjects(userId: number): Promise<ProjectsMembers[]> {
    const query = this.createQueryBuilder('ProjectsMembers')
      .leftJoinAndSelect(
        'ProjectsMembers.projects',
        'Projects',
        'Projects.status = :status',
        { status: true },
      )
      .where('ProjectsMembers.status = :status', { status: true })
      .andWhere('ProjectsMembers.userId = :userId', { userId });

    return query.getMany();
  }

  // NOTE: 프로젝트 삭제 후 복구 시 멤버들은 복구시킬 수 없다(프로젝트 오너만 유지)
  public deleteProjectMembers(projectId: number) {
    return this.createQueryBuilder()
      .update()
      .set({ status: false })
      .where('projectId = :projectId', { projectId })
      .execute();
  }
}
