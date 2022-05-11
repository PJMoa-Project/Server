import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import {
  ProjectsApplication,
  ProjectsLike,
  ProjectsMembers,
  ProjectsTechStacks,
  Users,
} from '@app/entity';

export enum OnOffLine {
  ONLINE = 'online',
  OFFLINE = 'offline',
  ONOFFLINE = 'onoffline',
}

export enum ProjectType {
  APP = 'app',
  WEB = 'web',
  GAME = 'game',
  ROBOT = 'robot',
  ETC = 'etc',
}

@Entity('Projects')
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean', { default: true })
  status: boolean;

  @Column()
  userId: number;

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

  @Column({
    type: 'enum',
    enum: ProjectType,
  })
  type: ProjectType;

  @Column()
  maxPeople: number;

  @Column({
    nullable: true,
  })
  region?: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne((type) => Users, (users) => users.projects)
  @JoinColumn({ name: 'userId' })
  users: Users;

  @OneToMany(
    (type) => ProjectsApplication,
    (projectsApplication) => projectsApplication.projects,
  )
  projectsApplication: ProjectsApplication[];

  @OneToMany(
    (type) => ProjectsMembers,
    (projectsMembers) => projectsMembers.projects,
  )
  projectsMembers: ProjectsMembers[];

  @OneToMany(
    (type) => ProjectsTechStacks,
    (projectsTechStacks) => projectsTechStacks.projects,
  )
  projectsTechStacks: ProjectsTechStacks[];

  @OneToMany((type) => ProjectsLike, (projectsLike) => projectsLike.projects)
  projectsLike: ProjectsLike[];
}
