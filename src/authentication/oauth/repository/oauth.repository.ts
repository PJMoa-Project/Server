import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Oauth, OauthProviderType } from '@app/entity';

@Injectable()
@EntityRepository(Oauth)
export class OauthRepository extends Repository<Oauth> {
  public createOauth(id: string, userId: number, provider: OauthProviderType) {
    return this.insert({
      id,
      userId,
      provider,
    });
  }

  public getOauth(id: string) {
    const query = this.createQueryBuilder('Oauth').where('Oauth.id = :id', {
      id,
    });

    return query.getOne();
  }
}
