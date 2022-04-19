import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { ProjectsMembersRepository } from './projects-members.repository';

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
}
