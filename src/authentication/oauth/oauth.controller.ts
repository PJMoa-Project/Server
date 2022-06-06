import { Req, Res } from '@nestjs/common';
import { Response } from 'express';

import {
  OauthController as Controller,
  KakaoLogin,
  KakaoCallback,
} from './oauth.controller.decorator';

@Controller()
export class OauthController {
  @KakaoLogin()
  public kakaoLogin() {
    return null;
  }

  @KakaoCallback()
  public kakaoCallback(@Req() { user }: { user: any }, @Res() res: Response) {
    res.json(user);
    return null;
  }
}
