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
    const query = this.createQueryBuilder('ProjectsApplication')
      .where('ProjectsApplication.userId = :userId', { userId })
      .andWhere('ProjectsApplication.projectId = :projectId', { projectId })
      .andWhere('ProjectsApplication.status = :status', { status: true });
    return query.getOne();
  }

  public findApproveApplication(
    applicationId: number,
  ): Promise<ProjectsApplication> {
    const query = this.createQueryBuilder('ProjectsApplication')
      .where('ProjectsApplication.id = :applicationId', { applicationId })
      .andWhere('ProjectsApplication.status = :status', { status: true });

    return query.getOne();
  }

  public approveApplication(applicationId: number) {
    return this.createQueryBuilder()
      .update()
      .set({ applicationStatus: ApplicationStatus.APPROVAL })
      .where('id = :applicationId', { applicationId })
      .execute();
  }

  public cancelApplication(applicationId: number) {
    return this.createQueryBuilder()
      .update()
      .set({ applicationStatus: ApplicationStatus.CANCEL })
      .where('id = :applicationId', { applicationId })
      .execute();
  }

  public rejectApplications(applicationId: number) {
    return this.createQueryBuilder()
      .update()
      .set({ applicationStatus: ApplicationStatus.REJECT })
      .where('id = :applicationId', { applicationId })
      .execute();
  }

  public getApplications(userId: number) {
    const query = this.createQueryBuilder('ProjectsApplication')
      .innerJoinAndSelect(
        'ProjectsApplication.projects',
        'Projects',
        'Projects.status = :status',
        { status: true },
      )
      .where('ProjectsApplication.status = :status', { status: true })
      .andWhere('ProjectsApplication.userId = :userId', { userId });

    return query.getMany();
  }

  public getProjectApplications(projectId: number) {
    const query = this.createQueryBuilder('ProjectsApplication')
      .innerJoinAndSelect(
        'ProjectsApplication.users',
        'Users',
        'Users.status = :status',
        { status: true },
      )
      .where('ProjectsApplication.status = :status', { status: true })
      .andWhere('ProjectsApplication.projectId = :projectId', { projectId })
      .andWhere('ProjectsApplication.applicationStatus IN (:applications)', {
        applications: [ApplicationStatus.CHECKING, ApplicationStatus.APPROVAL],
      });

    return query.getMany();
  }
}
