import { Body, Param } from '@nestjs/common';

import { User } from '@app/utils';
import { UserRequestDto } from '@api/shared/dto/user-request.dto';

import { ProjectsService } from './projects.service';
import {
  ProjectsController as Controller,
  CreateProject,
  UpdateProject,
} from './projects.controller.decorator';
import {
  CreateProjectsBodyRequestDto,
  CreateProjectsResponseDto,
  UpdateProjectsParamRequestDto,
  UpdateProjectsBodyRequestDto,
} from './dto';

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @CreateProject()
  public async createProject(
    @Body() createProjectsBodyRequestDto: CreateProjectsBodyRequestDto,
    @User() { userId }: UserRequestDto,
  ) {
    const result = await this.projectsService.createProject(
      createProjectsBodyRequestDto,
      userId,
    );

    return new CreateProjectsResponseDto(result);
  }

  @UpdateProject()
  public async updateProject(
    @Param() updateProjectsParamRequestDto: UpdateProjectsParamRequestDto,
    @Body() updateProjectsBodyRequestDto: UpdateProjectsBodyRequestDto,
    @User() { userId }: UserRequestDto,
  ) {
    await this.projectsService.updateProject(
      updateProjectsParamRequestDto,
      updateProjectsBodyRequestDto,
      userId,
    );
    return null;
  }
}
