import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Projects } from '@app/entity';

import { CreateProjects } from './dto/create-projects-request.dto';

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

    return this.save(projects);
  }
}
