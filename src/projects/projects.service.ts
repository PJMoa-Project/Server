import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Connection } from 'typeorm';

import { OnOffLine, Projects } from '@app/entity';

import { ProjectsRepository } from './repository';
import { ProjectsTechStacksRepository } from '../tech-stacks/repository';
import { ProjectsMembersRepository } from './members/projects-members.repository';
import {
  CreateProjectsBodyRequestDto,
  GetProjectsDetailParamRequestDto,
  GetProjectsDetailResponseDto,
  UpdateProjectsBodyRequestDto,
  UpdateProjectsParamRequestDto,
} from './dto';
import { GetProjectsTechStack } from './type';

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
    const result = await this.findProjectWithValidate(projectId);
    if (!result) {
      throw new NotFoundException('존재하지 않는 프로젝트 입니다');
    }

    if (userId !== result.userId) {
      throw new ForbiddenException('프로젝트 소유자 아닙니다');
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

  public async updateProject(
    { projectId }: UpdateProjectsParamRequestDto,
    updateProjectsBodyRequestDto: UpdateProjectsBodyRequestDto,
    userId: number,
  ) {
    await this.validateProjectOwner(userId, projectId);
    await this.projectsRepository.updateProject(
      projectId,
      updateProjectsBodyRequestDto,
    );

    return null;
  }

  private parseTechStacks(techStacks: GetProjectsTechStack[]): string[] {
    return techStacks.map(({ name }: GetProjectsTechStack) => name);
  }

  public async getProjectDetail(
    userId: number,
    { projectId }: GetProjectsDetailParamRequestDto,
  ): Promise<GetProjectsDetailResponseDto> {
    const {
      projectsApplication,
      projectsTechStacks,
      projectsMembers,
      projectsLike,
      users: { name: ownerName, gitUrl, aboutMe },
      ...projects
    } = await this.projectsRepository.getProjectDetail(projectId);

    const {
      title,
      contents,
      type,
      onOffLine,
      region,
      maxPeople: maxPeopleCount,
      startDate,
      endDate,
    } = projects;

    return {
      projectId,
      title,
      contents,
      type,
      onOffLine,
      region,
      maxPeopleCount,
      memberCount: projectsMembers.length,
      likeCount: projectsLike.length,
      startDate,
      endDate,
      ownerName,
      gitUrl,
      aboutMe,
      techStacks: this.parseTechStacks(projectsTechStacks),
    };
  }
}
