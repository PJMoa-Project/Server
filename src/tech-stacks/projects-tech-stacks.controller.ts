import { Body, Param } from '@nestjs/common';

import { User } from '@app/utils';
import { UserRequestDto } from '@api/shared/dto/user-request.dto';

import {
  ProjectsTechStacksController as Controller,
  DeleteTechStack,
  AddTechStack,
} from './projects-tech-stacks.controller.decorator';
import { ProjectsTechStacksService } from './projects-tech-stacks.service';
import {
  CreateTechStacksRequestDto,
  DeleteTechStacksParamRequestDto,
} from './dto';

@Controller()
export class ProjectsTechStacksController {
  constructor(
    private readonly projectsTechStacksService: ProjectsTechStacksService,
  ) {}

  @DeleteTechStack()
  public deleteTechStack(
    @User() { userId }: UserRequestDto,
    @Param() deleteTechStacksParamRequestDto: DeleteTechStacksParamRequestDto,
  ) {
    return this.projectsTechStacksService.deleteTechStacks(
      userId,
      deleteTechStacksParamRequestDto,
    );
  }

  @AddTechStack()
  public addTechStack(
    @User() { userId }: UserRequestDto,
    @Body() createTechStacksRequestDto: CreateTechStacksRequestDto,
  ) {
    return this.projectsTechStacksService.addTechStacks(
      userId,
      createTechStacksRequestDto,
    );
  }
}
