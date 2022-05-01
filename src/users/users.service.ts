import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Users } from '@app/entity';
import { UploadImageService } from '@app/uploadImage';

import { UsersRepository } from './repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly connection: Connection,
    private readonly userRepository: UsersRepository,
    private readonly uploadImageService: UploadImageService,
  ) {
    this.userRepository = this.connection.getCustomRepository(UsersRepository);
  }

  public async findUserByEmail(email: string): Promise<Users> {
    return this.userRepository.findUserByEmail(email);
  }

  public async setUserProfile(file: Express.Multer.File, userId: number) {
    const { Location: location } = await this.uploadImageService.uploadImage(
      file,
    );
    await this.userRepository.setUserProfileImage(userId, location);
    return null;
  }
}
