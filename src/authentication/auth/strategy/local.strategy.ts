import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from '../../../user/user.entity';
import { AuthService } from '../auth.service';

interface ValidateUserInterface {
  userId: number;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  public async validate(
    email: string,
    password: string,
  ): Promise<ValidateUserInterface> {
    const user: Omit<User, 'password'> | null =
      await this.authService.validatorUser(email, password);
    if (!user) {
      throw new UnauthorizedException('비밀번호 인증 실패');
    }
    return { userId: user.id };
  }
}
