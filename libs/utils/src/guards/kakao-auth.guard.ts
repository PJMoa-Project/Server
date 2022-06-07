import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
class KakaoAuthGuard extends AuthGuard('kakao') {}

export const KakaoAuth = () => UseGuards(KakaoAuthGuard);
