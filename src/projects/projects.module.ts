import { Module } from '@nestjs/common';

import { ProjectsMembersModule } from './members/projects-members.module';
import { ProjectsLikeModule } from './like/projects-like.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectsRepository } from './repository';

@Module({
  imports: [ProjectsMembersModule, ProjectsLikeModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository],
  exports: [ProjectsService],
})
export class ProjectsModule {}
