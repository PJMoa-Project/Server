import { Module } from '@nestjs/common';
import { ProjectsTechStacksRepository } from './repository';

@Module({
  providers: [ProjectsTechStacksRepository],
  exports: [ProjectsTechStacksRepository],
})
export class ProjectsTechStacksModule {}
