import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserRequestDto } from '../authentication/auth/dto/create-user-request.dto';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public createUser = ({
    email,
    password,
    name,
    mobile,
  }: CreateUserRequestDto): Promise<User> => {
    const user = new User();
    user.email = email;
    user.password = password;
    user.name = name;
    user.mobile = mobile;

    return this.save(user);
  };

  public findUserByEmail = (email: string): Promise<User> => {
    const result = this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    return result;
  };
}
