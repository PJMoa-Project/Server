import { Param } from '@nestjs/common';

import {
  ProjectsTechStacksController as Controller,
  DeleteTechStack,
} from './projects-tech-stacks.controller.decorator';
import { ProjectsTechStacksService } from './projects-tech-stacks.service';
import { DeleteTechStacksParamRequestDto } from './dto';

@Controller()
export class ProjectsTechStacksController {
  constructor(
    private readonly projectsTechStacksService: ProjectsTechStacksService,
  ) {}

  @DeleteTechStack()
  public deleteTechStack(
    @Param() deleteTechStacksParamRequestDto: DeleteTechStacksParamRequestDto,
  ) {
    return this.projectsTechStacksService.deleteTechStacks(
      deleteTechStacksParamRequestDto,
    );
  }
}
