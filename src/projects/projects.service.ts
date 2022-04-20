import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Connection } from 'typeorm';

import { OnOffLine, Projects } from '@app/entity';

import { ProjectsRepository, ProjectsTechStacksRepository } from './repository';
import { ProjectsMembersRepository } from './members/projects-members.repository';
import { CreateProjectsBodyRequestDto } from './dto';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly connection: Connection,
    private readonly projectsRepository: ProjectsRepository,
  ) {
    this.projectsRepository =
      this.connection.getCustomRepository(ProjectsRepository);
  }

  public async findProjectWithValidate(projectId: number): Promise<Projects> {
    const result = await this.projectsRepository.findById(projectId);
    if (!result) {
      throw new BadRequestException('존재하지 않는 프로젝트입니다.');
    }
    return result;
  }

  public async validateProjectOwner(
    userId: number,
    projectId: number,
  ): Promise<void> {
    const { userId: projectUserId } = await this.findProjectWithValidate(
      projectId,
    );
    if (userId !== projectUserId) {
      throw new BadRequestException(
        '프로젝트 소유자 아닙니다',
      );
    }
  }

  private validateRegion(onOffLine: OnOffLine, region?: string): void {
    if (
      (onOffLine === OnOffLine.ONLINE || onOffLine === OnOffLine.ONOFFLINE) &&
      !region
    ) {
      throw new BadRequestException(
        '온라인과 온오프라인은 반드시 지역을 기입해야 합니다',
      );
    }
  }

  public async createProject(
    createProjectsBodyRequestDto: CreateProjectsBodyRequestDto,
    userId: number,
  ) {
    const { techStack, onOffLine, region, ...rest } =
      createProjectsBodyRequestDto;
    this.validateRegion(onOffLine, region);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const projectsRepository =
      queryRunner.manager.getCustomRepository(ProjectsRepository);
    const projectsTechStacksRepository =
      queryRunner.manager.getCustomRepository(ProjectsTechStacksRepository);
    const projectsMembersRepository = queryRunner.manager.getCustomRepository(
      ProjectsMembersRepository,
    );
    try {
      const projects = await projectsRepository.createProject(
        { onOffLine, region, ...rest },
        userId,
      );

      await projectsTechStacksRepository.createTechStacks(
        projects.id,
        techStack,
      );

      await projectsMembersRepository.addProjectMember(projects.id, userId);

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
