import { Body, Controller, Get, Post, Request } from '@nestjs/common';

import { User } from '@app/utils';
import { LocalAuth, JwtAuth } from '@app/utils/guards';
import { UserRequestDto } from '@api/shared/dto/user-request.dto';

import { AuthService } from './auth.service';
import { CreateUserRequestDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    return this.authService.createUser(createUserRequestDto);
  }

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
