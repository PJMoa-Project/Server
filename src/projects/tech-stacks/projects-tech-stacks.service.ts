import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { ProjectsTechStacksRepository } from './repository';
import { DeleteTechStacksParamRequestDto } from './dto';

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

  public async deleteTechStacks({
    techStackId,
  }: DeleteTechStacksParamRequestDto) {
    await this.projectsTechStacksRepository.deleteTechStack(techStackId);

    return null;
  }
}
