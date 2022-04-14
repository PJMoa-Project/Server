import { BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export class AccessTokenService {
  constructor(@Inject('JwtService') private readonly jwtService: JwtService) {}

  public generateAccessToken({ userId }: { userId: string }) {
    if (!userId) {
      throw new BadRequestException('잘못된 accessToken');
    }
    return this.jwtService.sign({ userId });
  }
}
