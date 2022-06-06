import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Profile, Strategy } from 'passport-kakao';

import { OauthProviderType } from '@app/entity';

import { OauthService } from '../oauth.service';
import { IOauth } from '../type';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly configService: ConfigService,
    private readonly oauthService: OauthService,
  ) {
    super({
      clientID: configService.get('KAKAO_REST_API_KEY'),
      callbackURL: configService.get('KAKAO_OAUTH_URL'),
    });
  }

  public async validate(
    _: string,
    __: string,
    profile: Profile,
    done: any,
  ): Promise<void> {
    /**
     * NOTE
     * oauth 테이블에 profile 의 id 에 해당하는 유저가 없을 경우 유저 생성 후 로그인 진행
     * 만약 로그인 된 유저라면 바로 로그인 진행
     */
    try {
      const {
        id,
        _json: { kakao_account: kakaoUserInfo },
      } = profile;

      const oauthId = String(id);
      const oauthResult = await this.oauthService.getOauth(oauthId);

      // NOTE: 카카오를 통해 로그인하지 않은 경우
      if (!oauthResult) {
        const data: IOauth = {
          oauth: {
            id: oauthId,
            provider: OauthProviderType.KAKAO,
            email: kakaoUserInfo?.email,
          },
          isCreate: true,
        };
        done(null, data);
      }

      // NOTE: 카카오를 통해 로그인한 경우
      const { userId } = oauthResult;
      const data: IOauth = {
        oauth: {
          id: oauthId,
          provider: OauthProviderType.KAKAO,
          userId,
        },
        isCreate: false,
      };
      done(null, data);
    } catch (error) {
      done(error, null);
    }
  }
}
