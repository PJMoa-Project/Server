import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ProjectMembers')
export class ProjectMembers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean', { default: true })
  status: boolean;

  @Column()
  projectId: number;

  @Column()
  userId: number;
}
