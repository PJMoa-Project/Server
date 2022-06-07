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

  public createUserWithOauth(email: string) {
    const user = new Users();
    user.email = email;

    return this.save(user);
  }

  public findUserByEmail(email: string): Promise<Users | null> {
    const query = this.createQueryBuilder('Users').where(
      'Users.email = :email',
      { email },
    );

    return query.getOne();
  }

  public setUserProfileImage(userId: number, url: string) {
    return this.createQueryBuilder()
      .update()
      .set({ profileImage: url })
      .where('id = :userId', { userId })
      .execute();
  }

  public getUserById(userId: number): Promise<Users> {
    const query = this.createQueryBuilder('Users').where('Users.id = :userId', {
      userId,
    });

    return query.getOne();
  }
}
