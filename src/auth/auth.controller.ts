import { Body, Req } from '@nestjs/common';
import { Request } from 'express';

import { User } from '@app/utils';
import { UserRequestDto } from '@api/shared/dto/user-request.dto';

import {
  AuthController as Controller,
  CreateUser,
  Login,
  GetProfile,
} from './auth.controller.decorator';
import { AuthService } from './auth.service';
import { CreateUserRequestDto } from './dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @CreateUser()
  public createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    return this.authService.createUser(createUserRequestDto);
  }

  @Login()
  public async login(@Req() { user }: Request) {
    const result = await this.authService.loginUser(user);
    return result;
  }

  @GetProfile()
  public getProfile(@User() user: UserRequestDto) {
    return user;
  }
}
