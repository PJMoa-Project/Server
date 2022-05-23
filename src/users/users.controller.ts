import { Param, UploadedFile } from '@nestjs/common';

import { User } from '@app/utils';
import { UserRequestDto } from '@api/shared/dto/user-request.dto';

import {
  UsersController as Controller,
  SetUserProfile,
  GetUserProjects,
  GetUserIntroduce,
} from './users.controller.decorator';
import { UsersService } from './users.service';
import {
  GetUserProjectsResponseDto,
  GetUserIntroduceParamRequestDto,
} from './dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SetUserProfile()
  public setUserProfile(
    @UploadedFile() imageFile: Express.Multer.File,
    @User() { userId }: UserRequestDto,
  ) {
    return this.usersService.setUserProfile(imageFile, userId);
  }

  @GetUserProjects()
  public async getUserProjects(@User() { userId }: UserRequestDto) {
    const result = await this.usersService.getUserProjects(userId);

    return new GetUserProjectsResponseDto({
      userProjects: result,
    });
  }

  @GetUserIntroduce()
  public async getUserIntroduce(
    @Param() getUserIntroduceParamRequestDto: GetUserIntroduceParamRequestDto,
  ) {
    const result = await this.usersService.getUserIntroduce(
      getUserIntroduceParamRequestDto,
    );

    return result;
  }
}
