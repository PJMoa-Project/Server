import { Column, PrimaryGeneratedColumn, Entity, Index } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
}
