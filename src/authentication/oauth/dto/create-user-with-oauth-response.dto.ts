export class CreateUserWithOauthResponseDto {
  accessToken: string;

  constructor(partial: Partial<CreateUserWithOauthResponseDto>) {
    Object.assign(this, partial);
  }
}
