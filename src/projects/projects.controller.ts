import { Body, Param, Query } from '@nestjs/common';

import { User } from '@app/utils';
import { UserRequestDto } from '@api/shared/dto/user-request.dto';

import { ProjectsService } from './projects.service';
import {
  ProjectsController as Controller,
  CreateProject,
  UpdateProject,
  GetProjectDetail,
  GetProjects,
} from './projects.controller.decorator';
import {
  CreateProjectsBodyRequestDto,
  CreateProjectsResponseDto,
  UpdateProjectsParamRequestDto,
  UpdateProjectsBodyRequestDto,
  GetProjectsDetailParamRequestDto,
  GetProjectsDetailResponseDto,
} from './dto';
import { GetProjectsQueryRequestDto } from './dto/get-projects-request.dto';

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

  @GetProjectDetail()
  public async getProjectDetail(
    @User() { userId }: UserRequestDto,
    @Param() getProjectsDetailParamRequestDto: GetProjectsDetailParamRequestDto,
  ) {
    const result = await this.projectsService.getProjectDetail(
      userId,
      getProjectsDetailParamRequestDto,
    );

    return new GetProjectsDetailResponseDto(result);
  }

  @GetProjects()
  public async getProject(
    @Query() getProjectsQueryRequestDto: GetProjectsQueryRequestDto,
  ) {
    const result = await this.projectsService.getProjects(
      getProjectsQueryRequestDto,
    );

    return result;
  }
}
