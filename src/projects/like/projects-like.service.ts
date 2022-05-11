import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { ProjectsLikeRepository } from './repository';

@Injectable()
export class ProjectsLikeService {
  constructor(
    private readonly connection: Connection,
    private readonly projectsLikeRepository: ProjectsLikeRepository,
  ) {
    this.projectsLikeRepository = this.connection.getCustomRepository(
      ProjectsLikeRepository,
    );
  }

  public async isLikeUser(userId: number, projectId: number): Promise<boolean> {
    const result = await this.projectsLikeRepository.findProjectLikeByUser(
      userId,
      projectId,
    );

    return result !== 0;
  }
}
