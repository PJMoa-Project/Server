import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Users } from '@app/entity';

import { CreateUserRequestDto } from '../../authentication/auth/dto';

@Injectable()
@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  public createUser({
    email,
    password,
    name,
    mobile,
  }: CreateUserRequestDto): Promise<Users> {
    const user = new Users();
    user.email = email;
    user.password = password;
    user.name = name;
    user.mobile = mobile;

    return this.save(user);
  }

  public findUserByEmail(email: string): Promise<Users> {
    return this.createQueryBuilder('Users')
      .where('Users.email = :email', { email })
      .getOne();
  }
}
