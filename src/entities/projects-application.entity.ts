import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Projects, Users } from '@app/entity';

export enum ApplicationStatus {
  APPROVAL = 'approval',
  CHECKING = 'checking',
  REJECT = 'reject',
  CANCEL = 'cancel',
}

@Entity('ProjectsApplication')
export class ProjectsApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean', { default: true })
  status: boolean;

  @Column()
  projectId: number;

  @Column()
  userId: number;

  @Column({ type: 'enum', enum: ApplicationStatus })
  applicationStatus: ApplicationStatus;

  @Column({
    length: 100,
  })
  reason: string;

  @ManyToOne((type) => Users, (users) => users.projectsApplication)
  @JoinColumn({ name: 'userId' })
  users: Users;

  @ManyToOne((type) => Projects, (projects) => projects.projectsApplication)
  @JoinColumn({ name: 'projectId' })
  projects: Projects;
}
