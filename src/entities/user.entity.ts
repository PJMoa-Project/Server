import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean', { default: true })
  status: boolean;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column({
    length: 10,
  })
  name: string;

  @Column({
    length: 11,
  })
  @Index({ unique: true })
  mobile: string;

  @Column({
    nullable: true,
  })
  gitUrl: string;

  @Column({
    nullable: true,
    length: 50,
  })
  aboutMe: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
