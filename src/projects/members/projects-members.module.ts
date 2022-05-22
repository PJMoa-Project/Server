import { Module } from '@nestjs/common';

import { ProjectsMembersController } from './projects-members.controller';
import { ProjectsMembersService } from './projects-members.service';
import { ProjectsMembersRepository } from './repository';

@Module({
  controllers: [ProjectsMembersController],
  providers: [ProjectsMembersService, ProjectsMembersRepository],
  exports: [ProjectsMembersService, ProjectsMembersRepository],
})
export class ProjectsMembersModule {}
