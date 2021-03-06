import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as _ from 'lodash';

import { ProjectsMembers, Users } from '@app/entity';
import { UploadImageService } from '@app/uploadImage';

import { UsersRepository } from './repository';
import { ProjectsMembersRepository } from '../projects/members/repository';
import {
  GetUserIntroduce,
  GetUserIntroduceParamRequestDto,
  GetUserProjects,
} from './dto';

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

  public async findUserByEmail(email: string): Promise<Users | null> {
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

  private parseUserProjects(data: ProjectsMembers[]): GetUserProjects[] {
    return data.map(
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

  public async getUserIntroduce({
    userId,
  }: GetUserIntroduceParamRequestDto): Promise<GetUserIntroduce> {
    const result = await this.userRepository.getUserById(userId);

    if (!result) {
      throw new NotFoundException('존재하지 않는 유저입니다');
    }
    const { id, name, aboutMe, gitUrl, profileImage } = result;

    return {
      id,
      name,
      aboutMe,
      profileImage,
      gitUrl,
    };
  }
}
