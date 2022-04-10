import { Injectable } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findUser = (email: string): Promise<User> => {
    const result = this.findOne({ email });
    return result;
  };
}
