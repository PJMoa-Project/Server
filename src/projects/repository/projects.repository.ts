import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Projects } from '@app/entity';

import { CreateProjects, UpdateProjectsBodyRequestDto } from '../dto';
import { IGetProjectParam } from '../type';

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

  public getProjectDetail(projectId: number): Promise<Projects> {
    const query = this.createQueryBuilder('Projects')
      .leftJoinAndSelect(
        'Projects.projectsMembers',
        'ProjectsMembers',
        'ProjectsMembers.status = :status',
        { status: true },
      )
      .leftJoinAndSelect('Projects.projectsTechStacks', 'ProjectsTechStacks')
      .leftJoinAndSelect('Projects.projectsLike', 'ProjectsLike')
      .leftJoinAndSelect('Projects.users', 'Users')
      .where('Projects.id = :projectId', { projectId })
      .andWhere('Projects.status = :status', { status: true });

    return query.getOne();
  }

  public getProjects({
    personnel,
    region,
    projectType,
    onOffLine,
  }: IGetProjectParam) {
    const query = this.createQueryBuilder('Projects').leftJoinAndSelect(
      'Projects.projectsMembers',
      'ProjectsMembers',
      'ProjectsMembers.status = :status',
      { status: true },
    );
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

    return query.getMany();
  }
}
