import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { ProjectsApplication, ApplicationStatus } from '@app/entity';

@Injectable()
@EntityRepository(ProjectsApplication)
export class ProjectsApplicationRepository extends Repository<ProjectsApplication> {
  public addProjectApplication(
    userId: number,
    projectId: number,
    reason: string,
  ) {
    return this.insert({
      projectId,
      userId,
      applicationStatus: ApplicationStatus.CHECKING,
      reason,
    });
  }

  public findProjectApplicationByUser(userId: number, projectId: number) {
    return this.createQueryBuilder('ProjectsApplication')
      .where('ProjectsApplication.userId = :userId', { userId })
      .andWhere('ProjectsApplication.projectId = :projectId', { projectId })
      .andWhere('ProjectsApplication.status = :status', { status: true })
      .getOne();
  }
}
