import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  Index,
  BaseEntity,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column('text')
  password: string;

  @Column({
    length: 10,
  })
  name: string;

  @Column({
    length: 10,
  })
  @Index({ unique: true })
  mobile: string;
}
