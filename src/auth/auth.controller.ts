import { Controller, Get, Post, Request } from '@nestjs/common';

import { User } from '@app/utils';
import { LocalAuth, JwtAuth } from '@app/utils/guards';
import { UserRequestDto } from '@api/shared/dto/user-request.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @LocalAuth()
  @Post('login')
  async login(@Request() req) {
    const result = await this.authService.loginUser(req.user);
    return result;
  }

  @JwtAuth()
  @Get('profile')
  getProfile(@User() user: UserRequestDto) {
    return user;
  }
}
