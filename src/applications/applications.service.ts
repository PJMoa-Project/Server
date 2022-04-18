import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { ProjectsApplicationRepository } from './repository';
import { AddProjectApplicationDto } from './dto';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly connection: Connection,
    private readonly projectsApplicationRepository: ProjectsApplicationRepository,
  ) {
    this.projectsApplicationRepository = this.connection.getCustomRepository(
      ProjectsApplicationRepository,
    );
  }

  public async addProjectApplication(
    userId: number,
    { projectId, reason }: AddProjectApplicationDto,
  ) {
    try {
      await this.projectsApplicationRepository.addProjectApplication(
        userId,
        projectId,
        reason,
      );

      return null;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
