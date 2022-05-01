import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Users } from '@app/entity';

import { UsersRepository } from './repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly connection: Connection,
    private readonly userRepository: UsersRepository,
  ) {
    this.userRepository = this.connection.getCustomRepository(UsersRepository);
  }

  public async findUserByEmail(email: string): Promise<Users> {
    return this.userRepository.findUserByEmail(email);
  }

  // https://medium.com/geekculture/upload-image-to-aws-s3-localstack-using-nest-typescript-1104bcb5d9ec
  public createUserProfile(file: Express.Multer.File, userId: number) {
    return file;
  }
}
