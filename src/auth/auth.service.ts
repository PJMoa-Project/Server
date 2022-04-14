import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';

import { Bcrypt } from '@app/utils';

import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { CreateUserRequestDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly connection: Connection,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    @Inject('JwtService') private readonly jwtService: JwtService,
  ) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  public createUser = async ({ password, ...rest }: CreateUserRequestDto) => {
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
  };

  public validatorUser = async (email: string, pass: string) => {
    const user = await this.userService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  };

  public loginUser = async (user: any) => {
    const payload = { userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  };
}
