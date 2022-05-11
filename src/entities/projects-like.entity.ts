import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Projects, Users } from '@app/entity';

@Entity('ProjectsLike')
export class ProjectsLike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  projectId: number;

  @ManyToOne((type) => Users, (users) => users.projectsLike)
  @JoinColumn({ name: 'userId' })
  users: Users;

  @ManyToOne((type) => Projects, (projects) => projects.projectsLike)
  @JoinColumn({ name: 'projectId' })
  projects: Projects;
}
