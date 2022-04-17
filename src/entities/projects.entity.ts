import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
