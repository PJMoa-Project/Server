import { Body, Req } from '@nestjs/common';

import { User } from '@app/utils';
import { UserRequestDto } from '@api/shared/dto/user-request.dto';

import {
  AuthController as Controller,
  CreateUser,
  Login,
  GetProfile,
} from './auth.controller.decorator';
import { AuthService } from './auth.service';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  LoginUserResponseDto,
} from './dto';
import { IUserInterface } from './type';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @CreateUser()
  public async createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    const result = await this.authService.createUser(createUserRequestDto);
    return new CreateUserResponseDto(result);
  }

  @Login()
  public async login(@Req() { user }: { user: IUserInterface }) {
    return new LoginUserResponseDto({
      accessToken: await this.authService.loginUser(user.userId),
    });
  }

  @GetProfile()
  public getProfile(@User() user: UserRequestDto) {
    return user;
  }
}
