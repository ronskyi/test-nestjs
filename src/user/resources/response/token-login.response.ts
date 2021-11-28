import { Expose } from 'class-transformer';

export class TokenLoginResponse {
  @Expose({ name: 'access_token' })
  accessToken: string;

  public constructor(token: string) {
    this.accessToken = token;
  }
}
