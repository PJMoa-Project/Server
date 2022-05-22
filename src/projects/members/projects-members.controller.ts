import { Param } from '@nestjs/common';

import { User } from '@app/utils';
import { UserRequestDto } from '@api/shared/dto';

import {
  ProjectsMembersController as Controller,
  GetProjectMembers,
} from './projects-members.controller.decorator';
import {
  GetProjectsMembersParamRequestDto,
  GetProjectsMembersResponseDto,
} from './dto';
import { ProjectsMembersService } from './projects-members.service';

@Controller()
export class ProjectsMembersController {
  constructor(
    private readonly projectsMembersService: ProjectsMembersService,
  ) {}

  @GetProjectMembers()
  public async getProjectMembers(
    @User() { userId }: UserRequestDto,
    @Param()
    getProjectsMembersParamRequestDto: GetProjectsMembersParamRequestDto,
  ) {
    const result = await this.projectsMembersService.getProjectMembers(
      userId,
      getProjectsMembersParamRequestDto,
    );

    return new GetProjectsMembersResponseDto({
      members: result,
    });
  }
}
