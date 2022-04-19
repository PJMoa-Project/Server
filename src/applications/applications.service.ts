import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Connection } from 'typeorm';

import { ApplicationStatus } from '@app/entity';

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
    await this.projectsService.findProjectWithValidate(projectId);
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
      await this.projectsService.findProjectWithValidate(projectId);
    if (userId !== projectUserId) {
      throw new BadRequestException(
        '프로젝트 소유자가 아니므로 승인할 수 없습니다',
      );
    }
  }

  private async findApplicationUserIdWithValidate(applicationId: number) {
    const result =
      await this.projectsApplicationRepository.findApproveApplication(
        applicationId,
      );

    if (!result) {
      throw new BadRequestException('존재하지 않는 프로젝트 신청입니다');
    }

    const { applicationStatus } = result;

    if (applicationStatus === ApplicationStatus.REJECT) {
      throw new BadRequestException(
        '이미 거절한 프로젝트 신청이기에 승인할 수 없습니다.',
      );
    }
    if (applicationStatus === ApplicationStatus.APPROVAL) {
      throw new BadRequestException('이미 승인되었습니다');
    }

    return result;
  }

  public async approveApplication(
    { projectId, applicationId }: ApproveApplicationsParamRequestDto,
    userId: number,
  ) {
    await this.validateProjectOwner(userId, projectId);

    const { userId: applicationUserId } =
      await this.findApplicationUserIdWithValidate(applicationId);
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
