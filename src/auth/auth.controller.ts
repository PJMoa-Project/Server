import { Body, Get, Post, Request, Version } from '@nestjs/common';

import { User } from '@app/utils';
import { LocalAuth, JwtAuth } from '@app/utils/guards';
import { UserRequestDto } from '@api/shared/dto/user-request.dto';

import { AuthController as Controller } from './auth.controller.decorator';
import { AuthService } from './auth.service';
import { CreateUserRequestDto } from './dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    return this.authService.createUser(createUserRequestDto);
  }

  @LocalAuth()
  @Post('/login')
  public async login(@Request() req) {
    const result = await this.authService.loginUser(req.user);
    return result;
  }

  @JwtAuth()
  @Get('/profile')
  public getProfile(@User() user: UserRequestDto) {
    return user;
  }
}
