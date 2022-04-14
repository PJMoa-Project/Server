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

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @CreateUser()
  public async createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    const result = await this.authService.createUser(createUserRequestDto);
    return new CreateUserResponseDto(result);
  }

  @Login()
  public async login(
    @Req() { user: { userId } }: { user: { userId: string } },
  ) {
    return new LoginUserResponseDto({
      accessToken: await this.authService.loginUser(userId),
    });
  }

  @GetProfile()
  public getProfile(@User() user: UserRequestDto) {
    return user;
  }
}
