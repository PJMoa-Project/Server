import { Injectable, applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

export const LocalAuth = () => applyDecorators(UseGuards(LocalAuthGuard));
