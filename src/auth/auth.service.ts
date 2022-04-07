import { Inject, Injectable } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject('JwtService') private readonly jwtService: JwtService,
  ) {}

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
