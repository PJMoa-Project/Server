import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { User } from '@app/entity';

import { UserRepository } from './repository';

@Injectable()
export class UserService {
  constructor(
    private readonly connection: Connection,
    private readonly userRepository: UserRepository,
  ) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  public async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findUserByEmail(email);
  }
}
