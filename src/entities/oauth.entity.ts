import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Users } from '@app/entity';

export enum OauthProviderType {
  KAKAO = 'kakao',
}

@Entity('Oauth')
export class Oauth {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: number;

  @Column({
    type: 'enum',
    enum: OauthProviderType,
  })
  provider: OauthProviderType;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToOne((type) => Users, (users) => users.oauth)
  users: Users;
}
