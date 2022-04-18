import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { ProjectsRepository } from './projects.repository';
import { ProjectsTechStacksRepository } from './projects-tech-stacks.repository';
import { CreateProjectsBodyRequestDto } from './dto/create-projects-request.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly connection: Connection,
    private readonly projectsRepository: ProjectsRepository,
  ) {
    this.projectsRepository =
      this.connection.getCustomRepository(ProjectsRepository);
  }

  public async createProject(
    createProjectsBodyRequestDto: CreateProjectsBodyRequestDto,
    userId: number,
  ) {
    const { techStack, ...rest } = createProjectsBodyRequestDto;
    // offline, onoffline 일 경우 region 이 필수 값이다.

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const projectsRepository =
      queryRunner.manager.getCustomRepository(ProjectsRepository);
    const projectsTechStacksRepository =
      queryRunner.manager.getCustomRepository(ProjectsTechStacksRepository);
    try {
      const projects = await projectsRepository.createProject(rest, userId);

      await projectsTechStacksRepository.createTechStacks(
        projects.id,
        techStack,
      );

      await queryRunner.commitTransaction();
      return projects;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
