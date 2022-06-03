import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Oauth } from '@app/entity';

@Injectable()
@EntityRepository(Oauth)
export class OauthRepository extends Repository<Oauth> {}
