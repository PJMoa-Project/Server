import { Body } from '@nestjs/common';

import { User } from '@app/utils';
import { UserRequestDto } from '@api/shared/dto/user-request.dto';

import {
  ParticipationController as Controller,
  ApplyProjectsParticipation,
} from './applications.controller.decorator';
import { ApplicationsService } from './applications.service';
import { AddProjectApplicationDto } from './dto';

@Controller()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @ApplyProjectsParticipation()
  public async applyProjectsParticipation(
    @Body() applyProjectsRequestDto: AddProjectApplicationDto,
    @User() { userId }: UserRequestDto,
  ) {
    const result = await this.applicationsService.addProjectApplication(
      userId,
      applyProjectsRequestDto,
    );

    return result;
  }
}
