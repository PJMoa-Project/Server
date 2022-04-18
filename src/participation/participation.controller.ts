import { Body } from '@nestjs/common';
import {
  ParticipationController as Controller,
  ApplyProjectsParticipation,
} from './participation.controller.decorator';

import { ParticipationService } from './participation.service';
import { ApplyProjectsParticipationRequestDto } from './dto';

@Controller()
export class ParticipationController {
  constructor(private readonly participationService: ParticipationService) {}

  @ApplyProjectsParticipation()
  public applyProjectsParticipation(
    @Body() applyProjectsRequestDto: ApplyProjectsParticipationRequestDto,
  ) {
    return applyProjectsRequestDto;
  }
}
