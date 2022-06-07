import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @OneToOne(() => Users, (users) => users.oauth)
  @JoinColumn({ name: 'userId' })
  users: Users;
}
