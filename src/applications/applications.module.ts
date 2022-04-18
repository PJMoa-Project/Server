import { Module } from '@nestjs/common';

import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { ProjectsApplicationRepository } from './repository';

@Module({
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ProjectsApplicationRepository],
})
export class ApplicationsModule {}
