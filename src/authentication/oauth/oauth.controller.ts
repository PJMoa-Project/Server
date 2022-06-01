import { Req, Res } from '@nestjs/common';

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
  public kakaoCallback(@Req() req: any, @Res() res: Response) {
    console.log(req.user);
    res.redirect('https://www.op.gg/');
    return null;
  }
}
