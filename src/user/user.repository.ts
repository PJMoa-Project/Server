import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '@app/entity';

import { CreateUserRequestDto } from '../authentication/auth/dto';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public createUser({
    email,
    password,
    name,
    mobile,
  }: CreateUserRequestDto): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    user.name = name;
    user.mobile = mobile;

    return this.save(user);
  }

  public findUserByEmail(email: string): Promise<User> {
    return this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }
}
