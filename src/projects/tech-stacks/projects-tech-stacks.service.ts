import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { ProjectsTechStacksRepository } from './repository';
import {
  CreateTechStacksRequestDto,
  DeleteTechStacksParamRequestDto,
} from './dto';

@Injectable()
export class ProjectsTechStacksService {
  constructor(
    private readonly connection: Connection,
    private readonly projectsTechStacksRepository: ProjectsTechStacksRepository,
  ) {
    this.projectsTechStacksRepository = this.connection.getCustomRepository(
      ProjectsTechStacksRepository,
    );
  }

  public async deleteTechStacks(
    userId: number,
    { techStackId }: DeleteTechStacksParamRequestDto,
  ) {
    await this.projectsTechStacksRepository.deleteTechStack(techStackId);

    return null;
  }

  public async addTechStacks(
    userId: number,
    { projectId, name }: CreateTechStacksRequestDto,
  ) {
    await this.projectsTechStacksRepository.createTechStack(projectId, name);

    return null;
  }
}
