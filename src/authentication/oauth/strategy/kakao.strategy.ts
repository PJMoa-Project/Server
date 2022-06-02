import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, Profile } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService) {
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
      done(null, profile._json);
    } catch (error) {
      done(error, null);
    }
  }
}
