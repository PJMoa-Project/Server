import { UploadedFile } from '@nestjs/common';

import {
  UsersController as Controller,
  CreateUserProfile,
} from './users.controller.decorator';

@Controller()
export class UsersController {
  @CreateUserProfile()
  public createUserProfile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
