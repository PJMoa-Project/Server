import { Body } from '@nestjs/common';

import { User } from '@app/utils';
import { UserRequestDto } from '@api/shared/dto/user-request.dto';

import { ProjectsService } from './projects.service';
import {
  ProjectsController as Controller,
  CreateProject,
} from './projects.controller.decorator';
import { CreateProjectsBodyRequestDto } from './dto/create-projects-request.dto';

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @CreateProject()
  public createProject(
    @Body() createProjectsBodyRequestDto: CreateProjectsBodyRequestDto,
    @User() { userId }: UserRequestDto,
  ) {
    return this.projectsService.createProject(
      createProjectsBodyRequestDto,
      userId,
    );
  }
}
