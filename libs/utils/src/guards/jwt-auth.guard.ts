import {
  applyDecorators,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser>(err: Error, user: TUser, info: Error) {
    if (err || info || !user) {
      throw err || new UnauthorizedException(info.message);
    }
    return user;
  }
}

export const JwtAuth = () => applyDecorators(UseGuards(JwtAuthGuard));
