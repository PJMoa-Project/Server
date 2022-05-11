import { Module } from '@nestjs/common';

import { ProjectsLikeService } from './projects-like.service';
import { ProjectsLikeRepository } from './repository';

@Module({
  providers: [ProjectsLikeService, ProjectsLikeRepository],
  exports: [ProjectsLikeService, ProjectsLikeRepository],
})
export class ProjectsLikeModule {}
