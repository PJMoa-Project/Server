import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { ProjectsLike } from '@app/entity';

@Injectable()
@EntityRepository(ProjectsLike)
export class ProjectsLikeRepository extends Repository<ProjectsLike> {
  public findProjectLikeByUser(
    userId: number,
    projectId: number,
  ): Promise<number> {
    const query = this.createQueryBuilder('ProjectsLike')
      .where('ProjectsLike.userId = :userId', { userId })
      .andWhere('ProjectsLike.projectId = :projectId', { projectId });

    return query.getCount();
  }
}
