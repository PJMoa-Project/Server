import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Oauth, OauthProviderType } from '@app/entity';

import { OauthRepository } from './repository';
import { IOauth } from './type';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { UsersRepository } from '../../users/repository';

@Injectable()
export class OauthService {
  constructor(
    private readonly connection: Connection,
    private readonly oauthRepository: OauthRepository,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
  ) {
    this.oauthRepository = this.connection.getCustomRepository(OauthRepository);
  }

  public getOauth(id: string): Promise<Oauth | null> {
    return this.oauthRepository.getOauth(id);
  }

  private async createUserIfFound({
    id,
    userId,
    provider,
  }: {
    id: string;
    provider: OauthProviderType;
    userId: number;
  }): Promise<number> {
    await this.oauthRepository.createOauth({ id, userId, provider });

    return userId;
  }

  private async createUserIfNotFound({
    id,
    email,
    provider,
  }: {
    id: string;
    provider: OauthProviderType;
    email: string;
  }): Promise<number> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const usersRepository =
      queryRunner.manager.getCustomRepository(UsersRepository);
    const oauthRepository =
      queryRunner.manager.getCustomRepository(OauthRepository);

    try {
      const { id: userId } = await usersRepository.createUserWithOauth(email);
      await oauthRepository.createOauth({ id, userId, provider });

      await queryRunner.commitTransaction();
      return userId;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  private async createUserWithOauth({
    id,
    email,
    provider,
  }: {
    id: string;
    provider: OauthProviderType;
    email: string;
  }): Promise<number> {
    const user = await this.usersService.findUserByEmail(email);
    if (user) {
      return this.createUserIfFound({ id, provider, userId: user.id });
    }
    return this.createUserIfNotFound({ id, email, provider });
  }

  public async loginUser({
    isCreate,
    oauth: { id, email, provider, userId },
  }: IOauth): Promise<string> {
    if (isCreate) {
      const userIdResult = await this.createUserWithOauth({
        id,
        email,
        provider,
      });

      return this.authService.loginUser(userIdResult);
    }
    return this.authService.loginUser(userId);
  }
}
