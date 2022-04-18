import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Projects } from '@app/entity';

import { CreateProjects } from '../dto';

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
  ) {
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

  public findById(projectId: number) {
    return this.createQueryBuilder('Projects')
      .where('Projects.id = :projectId', { projectId })
      .andWhere('Projects.status = :status', { status: true })
      .getOne();
  }
}
