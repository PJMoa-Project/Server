import { BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ValidateUserInterface } from '../auth/type';

export class AccessTokenService {
  constructor(@Inject('JwtService') private readonly jwtService: JwtService) {}

  public generateAccessToken(payload: ValidateUserInterface) {
    if (!payload) {
      throw new BadRequestException('잘못된 accessToken');
    }
    return this.jwtService.sign({ payload });
  }
}
