import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Bcrypt } from '@app/utils';
import { Users } from '@app/entity';

import { AccessTokenService } from '../token/access-token.service';
import { UsersService } from '../../users/users.service';
import { UsersRepository } from '../../users/repository';
import { CreateUserRequestDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly connection: Connection,
    private readonly userService: UsersService,
    private readonly userRepository: UsersRepository,
    private readonly accessTokenService: AccessTokenService,
  ) {
    this.userRepository = this.connection.getCustomRepository(UsersRepository);
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
  ): Promise<Omit<Users, 'password'> | null> {
    const user: Users = await this.userService.findUserByEmail(email);
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
}
