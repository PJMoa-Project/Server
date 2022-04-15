import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Bcrypt } from '@app/utils';

import { AccessTokenService } from '../token/access-token.service';
import { UserRepository } from '../../user/user.repository';
import { User } from '../../user/user.entity';
import { CreateUserRequestDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly connection: Connection,
    private readonly userRepository: UserRepository,
    private readonly accessTokenService: AccessTokenService,
  ) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  public async createUser({ password, ...rest }: CreateUserRequestDto) {
    try {
      const hashedPassword = await Bcrypt.generateHash(password);
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
    const user: User = await this.userRepository.findUserByEmail(email);
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
