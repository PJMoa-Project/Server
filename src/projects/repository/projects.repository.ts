import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';

import { Projects } from '@app/entity';

import {
  CreateProjects,
  UpdateProjectsBodyRequestDto,
  GetProjectsQueryRequestDto,
} from '../dto';

@Injectable()
@EntityRepository(Projects)
export class ProjectsRepository extends Repository<Projects> {
  public createProject(
    {
      title,
      contents,
      onOffLine,
      type,
      maxPeople,
      startDate,
      endDate,
      region,
    }: CreateProjects,
    userId: number,
  ): Promise<Projects> {
    const projects = new Projects();
    projects.userId = userId;
    projects.title = title;
    projects.contents = contents;
    projects.onOffLine = onOffLine;
    projects.type = type;
    projects.maxPeople = maxPeople;
    projects.startDate = startDate;
    projects.endDate = endDate;
    projects.region = region;

    return this.save(projects);
  }

  public findById(projectId: number): Promise<Projects> {
    const query = this.createQueryBuilder('Projects')
      .where('Projects.id = :projectId', { projectId })
      .andWhere('Projects.status = :status', { status: true });

    return query.getOne();
  }

  public updateProject(
    projectId: number,
    { region, ...rest }: UpdateProjectsBodyRequestDto,
  ) {
    return this.createQueryBuilder()
      .update()
      .set({ ...rest, region: region || null })
      .where('id = :projectId', { projectId })
      .execute();
  }

  private getProjectsWithMembersQuery(): SelectQueryBuilder<Projects> {
    return this.createQueryBuilder('Projects').leftJoinAndSelect(
      'Projects.projectsMembers',
      'ProjectsMembers',
      'ProjectsMembers.status = :status',
      { status: true },
    );
  }

  public getProjectDetail(projectId: number): Promise<Projects> {
    const query = this.getProjectsWithMembersQuery()
      .leftJoinAndSelect('Projects.projectsTechStacks', 'ProjectsTechStacks')
      .leftJoinAndSelect('Projects.projectsLike', 'ProjectsLike')
      .leftJoinAndSelect('Projects.users', 'Users')
      .where('Projects.id = :projectId', { projectId })
      .andWhere('Projects.status = :status', { status: true });

    return query.getOne();
  }

  public getProjects(
    queryParam: GetProjectsQueryRequestDto,
  ): Promise<[Projects[], number]> {
    const { region, personnel, projectType, onOffLine } = queryParam;

    const query = this.getProjectsWithMembersQuery()
      .limit(queryParam.getLimit())
      .offset(queryParam.getOffset())
      .where('Projects.status = :status', { status: true });

    if (region) {
      query.andWhere('Projects.region = :region', { region });
    }
    if (personnel) {
      query.andWhere('Projects.maxPeople >= :personnel', { personnel });
    }
    if (projectType) {
      query.andWhere('Projects.type = :projectType', { projectType });
    }
    if (onOffLine) {
      query.andWhere('Projects.onOffLine = :onOffLine', { onOffLine });
    }
    query.orderBy('Projects.createdAt', 'DESC');

    return query.getManyAndCount();
  }

  public getUserProjects(userId: number) {
    const query = this.getProjectsWithMembersQuery()
      .where('Projects.userId = :userId', { userId })
      .orderBy('Projects.createdAt', 'DESC');

    return query.getMany();
  }
}
