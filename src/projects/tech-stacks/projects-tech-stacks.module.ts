import { Module } from '@nestjs/common';

import { ProjectsTechStacksController } from './projects-tech-stacks.controller';
import { ProjectsTechStacksRepository } from './repository';
import { ProjectsTechStacksService } from './projects-tech-stacks.service';

@Module({
  controllers: [ProjectsTechStacksController],
  providers: [ProjectsTechStacksService, ProjectsTechStacksRepository],
  exports: [ProjectsTechStacksService, ProjectsTechStacksRepository],
})
export class ProjectsTechStacksModule {}
