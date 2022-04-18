import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { ProjectsRepository } from './projects.repository';
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
    // 프로젝트 생성 후, 프로젝트 id 를 통해서 tech 스택을 추가해야한다.
    try {
      const { id: projectId } = await projectsRepository.createProject(
        rest,
        userId,
      );

      await queryRunner.commitTransaction();
      return projectId;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
