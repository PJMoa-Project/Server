import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum OnOffLine {
  ONLINE = 'online',
  OFFLINE = 'offline',
  ONOFFLINE = 'onoffline',
}

@Entity('Projects')
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean', { default: true })
  status: boolean;

  @Column({
    length: 50,
  })
  title: string;

  @Column('text')
  contents: string;

  @Column({
    type: 'enum',
    enum: OnOffLine,
  })
  onOffLine: OnOffLine;

  @Column()
  maxPeople: number;
}
