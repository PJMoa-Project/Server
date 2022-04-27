import { Param } from '@nestjs/common';

import {
  ProjectsTechStacksController as Controller,
  DeleteTechStack,
} from './projects-tech-stacks.controller.decorator';
import { DeleteTechStacksParamRequestDto } from './dto';

@Controller()
export class ProjectsTechStacksController {
  @DeleteTechStack()
  public deleteTechStack(
    @Param() deleteTechStacksParamRequestDto: DeleteTechStacksParamRequestDto,
  ) {
    return deleteTechStacksParamRequestDto;
  }
}
