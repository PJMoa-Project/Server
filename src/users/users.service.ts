import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as _ from 'lodash';

import { ProjectsMembers, Users } from '@app/entity';
import { UploadImageService } from '@app/uploadImage';

import { UsersRepository } from './repository';
import { ProjectsMembersRepository } from '../projects/members/repository';
import { GetUserProjects } from './dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly connection: Connection,
    private readonly userRepository: UsersRepository,
    private readonly projectsMembersRepository: ProjectsMembersRepository,
    private readonly uploadImageService: UploadImageService,
  ) {
    this.userRepository = this.connection.getCustomRepository(UsersRepository);
    this.projectsMembersRepository = this.connection.getCustomRepository(
      ProjectsMembersRepository,
    );
  }

  public async findUserByEmail(email: string): Promise<Users> {
    return this.userRepository.findUserByEmail(email);
  }

  public async setUserProfile(file: Express.Multer.File, userId: number) {
    if (!file) {
      throw new NotFoundException('이미지 파일이 없습니다');
    }
    const { Location: location } = await this.uploadImageService.uploadImage(
      file,
    );
    await this.userRepository.setUserProfileImage(userId, location);
    return null;
  }

  private parseUserProjects(projects: ProjectsMembers[]): GetUserProjects[] {
    return projects.map(
      ({
        projects: {
          title: projectTitle,
          startDate,
          endDate,
          userId: projectUserId,
        },
        projectId,
        userId,
      }: ProjectsMembers): GetUserProjects => ({
        projectId,
        projectTitle,
        startDate,
        endDate,
        isProjectOwner: userId === projectUserId,
      }),
    );
  }

  public async getUserProjects(userId: number) {
    const result = await this.projectsMembersRepository.getUserProjects(userId);

    return _.isEmpty(result) ? null : this.parseUserProjects(result);
  }
}
