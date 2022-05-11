import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Connection } from 'typeorm';

import { ApplicationStatus, ProjectsApplication } from '@app/entity';

import { ProjectsApplicationRepository } from './repository';
import {
  AddProjectApplicationDto,
  ApproveApplicationsParamRequestDto,
  CancelApplicationsRequestDto,
  RejectApplicationsRequestDto,
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

  private async validateAddApplication(
    userId: number,
    projectUserId: number,
    projectId: number,
  ): Promise<void> {
    if (userId === projectUserId) {
      throw new BadRequestException('프로젝트 담당자는 신청할 수 없습니다');
    }
    const result =
      await this.projectsApplicationRepository.findProjectApplicationByUser(
        userId,
        projectId,
      );
    if (result) {
      throw new BadRequestException('이미 신청한 프로젝트입니다');
    }
  }

  public async addProjectApplication(
    userId: number,
    { projectId, reason }: AddProjectApplicationDto,
  ) {
    const { userId: ProjectUserId, maxPeople } =
      await this.projectsService.findProjectWithValidate(projectId);

    await this.validateAddApplication(userId, ProjectUserId, projectId);
    await this.projectsMembersService.validateMaxPeople(projectId, maxPeople);
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

  private validateExistedApplication(application?: ProjectsApplication) {
    if (!application) {
      throw new BadRequestException('존재하지 않는 프로젝트 신청입니다');
    }
  }

  private validateApplication(application?: ProjectsApplication) {
    this.validateExistedApplication(application);

    const { applicationStatus } = application;

    if (
      applicationStatus === ApplicationStatus.REJECT ||
      applicationStatus === ApplicationStatus.CANCEL
    ) {
      throw new BadRequestException('이미 취소/거절된 프로젝트 신청입니다');
    }
    if (applicationStatus === ApplicationStatus.APPROVAL) {
      throw new BadRequestException('승인된 상태입니다');
    }
  }

  public async approveApplication(
    { projectId, applicationId }: ApproveApplicationsParamRequestDto,
    userId: number,
  ) {
    await this.projectsService.validateProjectOwner(userId, projectId);

    const applicationResult =
      await this.projectsApplicationRepository.findApproveApplication(
        applicationId,
      );
    await this.validateApplication(applicationResult);

    const { userId: applicationUserId } = applicationResult;
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

  private validateCancelApplication(
    userId: number,
    application?: ProjectsApplication,
  ) {
    this.validateApplication(application);
    const { userId: applicationUserId } = application;

    if (userId !== applicationUserId) {
      throw new BadRequestException('신청자가 아닙니다');
    }
  }

  public async cancelApplication(
    { applicationId }: CancelApplicationsRequestDto,
    userId: number,
  ) {
    const applicationResult =
      await this.projectsApplicationRepository.findApproveApplication(
        applicationId,
      );
    this.validateCancelApplication(userId, applicationResult);

    await this.projectsApplicationRepository.cancelApplication(applicationId);
    return null;
  }

  private validateRejectApplications(application?: ProjectsApplication): void {
    this.validateExistedApplication(application);
    const { applicationStatus } = application;

    if (applicationStatus !== ApplicationStatus.CHECKING) {
      throw new BadRequestException(
        'checking(확인중) 상태일 때만 거절이 가능합니다',
      );
    }
  }

  public async rejectApplications(
    { projectId, applicationId }: RejectApplicationsRequestDto,
    userId: number,
  ) {
    await this.projectsService.validateProjectOwner(userId, projectId);
    const applicationResult =
      await this.projectsApplicationRepository.findApproveApplication(
        applicationId,
      );
    this.validateRejectApplications(applicationResult);

    await this.projectsApplicationRepository.rejectApplications(applicationId);
    return null;
  }
}
