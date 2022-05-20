import { Module } from '@nestjs/common';

import { ProjectsMembersService } from './projects-members.service';
import { ProjectsMembersRepository } from './repository';

@Module({
  providers: [ProjectsMembersService, ProjectsMembersRepository],
  exports: [ProjectsMembersService, ProjectsMembersRepository],
})
export class ProjectsMembersModule {}
