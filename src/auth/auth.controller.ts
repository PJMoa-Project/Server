import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { User } from '@app/utils/user.decorator';
import { UserRequestDto } from '@api/shared/dto/user-request.dto';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const result = await this.authService.loginUser(req.user);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: UserRequestDto) {
    return user;
  }
}
