import { Module } from '@nestjs/common';

import { ProjectsTechStacksRepository } from './repository';
import { ProjectsTechStacksService } from './projects-tech-stacks.service';

@Module({
  providers: [ProjectsTechStacksService, ProjectsTechStacksRepository],
  exports: [ProjectsTechStacksService, ProjectsTechStacksRepository],
})
export class ProjectsTechStacksModule {}
