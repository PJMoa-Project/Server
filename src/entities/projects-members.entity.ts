import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ProjectsMembers')
export class ProjectsMembers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean', { default: true })
  status: boolean;

  @Column()
  projectId: number;

  @Column()
  userId: number;
}
