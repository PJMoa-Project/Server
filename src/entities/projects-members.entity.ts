import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Projects, Users } from '@app/entity';

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

  @ManyToOne((type) => Users, (users) => users.projectsMembers)
  @JoinColumn({ name: 'userId' })
  users: Users;

  @ManyToOne((type) => Projects, (projects) => projects.projectsMembers)
  @JoinColumn({ name: 'projectId' })
  projects: Projects;
}
