import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, Profile } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: `de0b3d288a245d038f7e01c6366a42ea`,
      callbackURL: `/v1/oauth/kakao/callback`,
    });
  }

  public async validate(
    _: string,
    __: string,
    profile: Profile,
    done: any,
  ): Promise<void> {
    try {
      done(null, profile._json);
    } catch (error) {
      done(error, null);
    }
  }
}
