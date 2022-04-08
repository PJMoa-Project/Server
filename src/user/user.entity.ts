import { Column, PrimaryGeneratedColumn, Entity, Index } from 'typeorm';

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
  phoneNumber: string;
}
