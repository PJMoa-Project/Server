import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { UserRepository } from './user.repository';

export type UserTest = any;

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private readonly users = [
    {
      userId: 1,
      email: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'maria',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<UserTest | undefined> {
    return this.users.find((user) => user.email === email);
  }

  public async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findUserByEmail(email);
  }
}
