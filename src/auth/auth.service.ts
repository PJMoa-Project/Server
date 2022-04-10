import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Connection } from 'typeorm';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { CreateUserRequestDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly connection: Connection,
    @Inject('JwtService') private readonly jwtService: JwtService,
  ) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  createUser = async ({ email }: CreateUserRequestDto) => {
    return email;
  };

  validatorUser = async (email: string, pass: string) => {
    const user = await this.userService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  };

  loginUser = async (user: any) => {
    const payload = { userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  };
}
