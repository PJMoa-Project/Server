import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Bcrypt } from '@app/utils';
import { User } from '@app/entity';

import { AccessTokenService } from '../token/access-token.service';
import { UserService } from '../../user/user.service';
import { UserRepository } from '../../user/user.repository';
import { CreateUserRequestDto } from './dto';

// https://www.inflearn.com/questions/248618 - transaction 참고
@Injectable()
export class AuthService {
  constructor(
    private readonly connection: Connection,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly accessTokenService: AccessTokenService,
  ) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  public async createUser({ password, ...rest }: CreateUserRequestDto) {
    const hashedPassword = await Bcrypt.generateHash(password);
    try {
      return await this.userRepository.createUser({
        password: hashedPassword,
        ...rest,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        error?.sqlMessage ? error.sqlMessage : error,
      );
    }
  }

  public async validatorUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user: User = await this.userService.findUserByEmail(email);
    if (user && (await Bcrypt.isMatch(user.password, pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async loginUser(userId: number) {
    const payload = { userId };
    return this.accessTokenService.generateAccessToken(payload);
  }

  // public async test() {
  //   const queryRunner = this.connection.createQueryRunner();
  //   await queryRunner.connect();

  //   const userRepository =
  //     queryRunner.manager.getCustomRepository(UserRepository);
  // }
}
