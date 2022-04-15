import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects')
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  title: string;

  @Column('text')
  contents: string;
}
