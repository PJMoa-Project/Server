import { Module } from '@nestjs/common';

import { ProjectsMembersRepository } from './projects-members.repository';

@Module({
  providers: [ProjectsMembersRepository],
  exports: [ProjectsMembersRepository],
})
export class ProjectsMembersModule {}
