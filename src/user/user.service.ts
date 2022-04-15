import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findUserByEmail(email);
  }
}
