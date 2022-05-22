import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Connection } from 'typeorm';

import { ProjectsMembersRepository } from './repository';
import { GetProjectsMembersParamRequestDto } from './dto';

@Injectable()
export class ProjectsMembersService {
  constructor(
    private readonly connection: Connection,
    private readonly projectsMembersRepository: ProjectsMembersRepository,
  ) {
    this.projectsMembersRepository = this.connection.getCustomRepository(
      ProjectsMembersRepository,
    );
  }

  public async validateMaxPeople(projectId: number, maxPeople: number) {
    const result = await this.projectsMembersRepository.getProjectMemberCount(
      projectId,
    );

    if (result >= maxPeople) {
      throw new ForbiddenException('프로젝트가 최대 인원입니다');
    }
  }

  public async validateExistedMember(
    projectId: number,
    userId: number,
  ): Promise<void> {
    const result =
      await this.projectsMembersRepository.findProjectMemberByUserId(
        projectId,
        userId,
      );
    if (result) {
      throw new BadRequestException('이미 프로젝트에 속한 멤버입니다');
    }
  }

  public async getProjectMembers(
    userId: number,
    { projectId }: GetProjectsMembersParamRequestDto,
  ) {
    return projectId;
  }
}
