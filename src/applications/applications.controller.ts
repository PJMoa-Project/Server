import { Body, Param } from '@nestjs/common';

import { User } from '@app/utils';
import { UserRequestDto } from '@api/shared/dto/user-request.dto';

import {
  ParticipationController as Controller,
  ApplyProjectsParticipation,
  ApproveApplications,
  CancelApplications,
} from './applications.controller.decorator';
import { ApplicationsService } from './applications.service';
import {
  AddProjectApplicationDto,
  ApproveApplicationsParamRequestDto,
  CancelApplicationsRequestDto,
} from './dto';

@Controller()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @ApplyProjectsParticipation()
  public applyProjectsParticipation(
    @Body() applyProjectsRequestDto: AddProjectApplicationDto,
    @User() { userId }: UserRequestDto,
  ) {
    return this.applicationsService.addProjectApplication(
      userId,
      applyProjectsRequestDto,
    );
  }

  @ApproveApplications()
  public approveApplications(
    @Param()
    approveApplicationsParamRequestDto: ApproveApplicationsParamRequestDto,
    @User() { userId }: UserRequestDto,
  ) {
    return this.applicationsService.approveApplication(
      approveApplicationsParamRequestDto,
      userId,
    );
  }

  @CancelApplications()
  public cancelApplications(
    @Param() cancelApplicationsRequestDto: CancelApplicationsRequestDto,
    @User() { userId }: UserRequestDto,
  ) {
    return this.applicationsService.cancelApplication(
      cancelApplicationsRequestDto,
      userId,
    );
  }
}
