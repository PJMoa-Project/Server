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
}
