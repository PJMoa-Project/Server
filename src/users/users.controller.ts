import { UploadedFile } from '@nestjs/common';

import { User } from '@app/utils';
import { UserRequestDto } from '@api/shared/dto/user-request.dto';

import {
  UsersController as Controller,
  SetUserProfile,
} from './users.controller.decorator';
import { UsersService } from './users.service';

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
}
