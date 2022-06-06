import { OauthProviderType } from '@app/entity';

export interface IOauth {
  oauth: {
    id: string;
    provider: OauthProviderType;
    email?: string;
    userId?: number;
  };
  isCreate: boolean;
}
