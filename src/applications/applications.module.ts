import { Module } from '@nestjs/common';

import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { ProjectsApplicationRepository } from './repository';
import { ProjectsModule } from '../projects/projects.module';
import { ProjectsMembersModule } from '../projects/members/projects-members.module';

@Module({
  imports: [ProjectsModule, ProjectsMembersModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ProjectsApplicationRepository],
})
export class ApplicationsModule {}
