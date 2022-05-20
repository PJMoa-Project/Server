import { Module } from '@nestjs/common';

import { UploadImageModule } from '@app/uploadImage';

import { UsersController } from './users.controller';
import { UsersRepository } from './repository';
import { UsersService } from './users.service';
import { ProjectsMembersModule } from '../projects/members/projects-members.module';

@Module({
  imports: [UploadImageModule, ProjectsMembersModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
