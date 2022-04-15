export class LoginUserResponseDto {
  accessToken: string;

  constructor(partial: Partial<LoginUserResponseDto>) {
    Object.assign(this, partial);
  }
}
