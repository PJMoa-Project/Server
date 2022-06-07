import { ForbiddenException, Req, Res } from '@nestjs/common';
import { Response } from 'express';

import {
  OauthController as Controller,
  KakaoLogin,
  KakaoCallback,
} from './oauth.controller.decorator';
import { IOauth } from './type';
import { OauthService } from './oauth.service';
import { CreateUserWithOauthResponseDto } from './dto';

@Controller()
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @KakaoLogin()
  public kakaoLogin() {
    return null;
  }

  @KakaoCallback()
  public async kakaoCallback(
    @Req() { user }: { user: IOauth },
    @Res() res: Response,
  ) {
    if (!user.oauth.email) {
      throw new ForbiddenException('이메일 동의를 해주세요');
    }
    // IOauth 의 isCreate 가 true 일 경우 생성 후 Oauth 와 User 를 생성해서 jwt Token 을 전송하고, false 일 경우 user.oauth.userId 의 고객 id 에 해당하는 토큰을 발급해줘야 한다.
    const result = await this.oauthService.loginUser(user);
    res.json(new CreateUserWithOauthResponseDto({ accessToken: result }));

    return null;
  }
}
