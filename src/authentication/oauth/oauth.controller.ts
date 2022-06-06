import { Req, Res } from '@nestjs/common';
import { Response } from 'express';

import {
  OauthController as Controller,
  KakaoLogin,
  KakaoCallback,
} from './oauth.controller.decorator';
import { IOauth } from './type';

@Controller()
export class OauthController {
  @KakaoLogin()
  public kakaoLogin() {
    return null;
  }

  @KakaoCallback()
  public kakaoCallback(
    @Req() { user }: { user: IOauth },
    @Res() res: Response,
  ) {
    // IOauth 의 isCreate 가 true 일 경우 생성 후 Oauth 와 User 를 생성해서 jwt Token 을 전송하고, false 일 경우 user.oauth.userId 의 고객 id 에 해당하는 토큰을 발급해줘야 한다.
    res.json(user);
    return null;
  }
}
