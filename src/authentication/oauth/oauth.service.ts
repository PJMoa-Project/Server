import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Oauth } from '@app/entity';

import { OauthRepository } from './repository';

@Injectable()
export class OauthService {
  constructor(
    private readonly connection: Connection,
    private readonly oauthRepository: OauthRepository,
  ) {
    this.oauthRepository = this.connection.getCustomRepository(OauthRepository);
  }

  public getOauth(id: string): Promise<Oauth | null> {
    return this.oauthRepository.getOauth(id);
  }
}
