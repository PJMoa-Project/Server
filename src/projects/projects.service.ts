import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import * as _ from 'lodash';

import { OnOffLine, Projects } from '@app/entity';
import { DateFns } from '@app/utils';

import { ProjectsRepository } from './repository';
import { ProjectsTechStacksRepository } from './tech-stacks/repository';
import { ProjectsMembersRepository } from './members/repository';
import { ProjectsLikeService } from './like/projects-like.service';
import {
  CreateProjectsBodyRequestDto,
  GetProjectsDetailParamRequestDto,
  GetProjectsDetailResponseDto,
  GetProjectsQueryRequestDto,
  UpdateProjectsBodyRequestDto,
  UpdateProjectsParamRequestDto,
  GetProjects,
  GetProjectsResponseDto,
} from './dto';
import { GetProjectsTechStack } from './type';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly connection: Connection,
    private readonly projectsRepository: ProjectsRepository,
    private readonly projectsLikeService: ProjectsLikeService,
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

  private validateDate(startDate: Date): void {
    const projectStartDate = DateFns.getDate(startDate);
    const now = DateFns.now();
    if (now > projectStartDate) {
      throw new BadRequestException('시작일은 현재시간보다 커야합니다');
    }
  }

  public async createProject(
    createProjectsBodyRequestDto: CreateProjectsBodyRequestDto,
    userId: number,
  ) {
    const { techStack, onOffLine, region, startDate, ...rest } =
      createProjectsBodyRequestDto;
    this.validateDate(startDate);
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
        { onOffLine, region, startDate, ...rest },
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
    const result = await this.projectsRepository.getProjectDetail(projectId);
    if (!result) {
      throw new NotFoundException('프로젝트가 존재하지 않습니다');
    }

    const {
      projectsApplication,
      projectsTechStacks,
      projectsMembers,
      projectsLike,
      users: { name: ownerName, gitUrl, aboutMe },
      ...projects
    } = result;

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
      isLike: await this.projectsLikeService.isLikeUser(userId, projectId),
    };
  }

  public parseProjects(projects: Projects[]): GetProjects[] {
    return projects.map(
      ({
        id: projectId,
        title,
        type: projectType,
        onOffLine,
        region,
        projectsMembers,
        maxPeople,
        startDate,
        endDate,
      }: Projects) => ({
        projectId,
        title,
        projectType,
        onOffLine,
        region,
        memberCount: projectsMembers.length,
        maxPeople,
        startDate,
        endDate,
      }),
    );
  }

  public async getProjects(
    getProjectsQueryRequestDto: GetProjectsQueryRequestDto,
  ): Promise<GetProjectsResponseDto> {
    const result = await this.projectsRepository.getProjects(
      getProjectsQueryRequestDto,
    );

    return {
      projects: _.isEmpty(result[0]) ? null : this.parseProjects(result[0]),
      projectCount: result[1],
    };
  }

  public async deleteProject() {
    return null;
  }
}
