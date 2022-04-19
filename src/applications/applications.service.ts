import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Connection } from 'typeorm';

import { ProjectsApplicationRepository } from './repository';
import {
  AddProjectApplicationDto,
  ApproveApplicationsParamRequestDto,
} from './dto';
import { ProjectsService } from '../projects/projects.service';
import { ProjectsMembersRepository } from '../projects/members/projects-members.repository';
import { ProjectsMembersService } from '../projects/members/projects-members.service';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly connection: Connection,
    private readonly projectsApplicationRepository: ProjectsApplicationRepository,
    private readonly projectsService: ProjectsService,
    private readonly projectsMembersService: ProjectsMembersService,
  ) {
    this.projectsApplicationRepository = this.connection.getCustomRepository(
      ProjectsApplicationRepository,
    );
  }

  private async validateApplication(
    userId: number,
    projectId: number,
  ): Promise<void> {
    const result =
      await this.projectsApplicationRepository.findProjectApplicationByUser(
        userId,
        projectId,
      );
    if (result) {
      throw new BadRequestException('이미 신청된 프로젝트입니다');
    }
  }

  public async addProjectApplication(
    userId: number,
    { projectId, reason }: AddProjectApplicationDto,
  ) {
    await this.projectsService.validateProject(projectId);
    await this.validateApplication(userId, projectId);
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

  private async validateProjectOwner(
    userId: number,
    projectId: number,
  ): Promise<void> {
    const { userId: projectUserId } =
      await this.projectsService.validateProject(projectId);
    if (userId !== projectUserId) {
      throw new BadRequestException(
        '프로젝트 소유자가 아니므로 승인할 수 없습니다',
      );
    }
  }

  public async approveApplication(
    { projectId, applicationId }: ApproveApplicationsParamRequestDto,
    userId: number,
  ) {
    await this.validateProjectOwner(userId, projectId);
    const { userId: applicationUserId } =
      await this.projectsApplicationRepository.findApproveApplication(
        applicationId,
      );
    await this.projectsMembersService.validateExistedMember(
      projectId,
      applicationUserId,
    );

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const projectsApplicationRepository =
      queryRunner.manager.getCustomRepository(ProjectsApplicationRepository);
    const projectsMemberRepository = queryRunner.manager.getCustomRepository(
      ProjectsMembersRepository,
    );
    try {
      await projectsApplicationRepository.approveApplication(applicationId);
      await projectsMemberRepository.addProjectMember(
        projectId,
        applicationUserId,
      );
      await queryRunner.commitTransaction();
      return null;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
