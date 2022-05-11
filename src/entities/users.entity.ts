import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Projects, ProjectsApplication, ProjectsMembers } from '@app/entity';

@Entity('Users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean', { default: true })
  status: boolean;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column({
    length: 10,
  })
  name: string;

  @Column({
    length: 11,
  })
  @Index({ unique: true })
  mobile: string;

  @Column({
    nullable: true,
  })
  gitUrl: string;

  @Column({
    nullable: true,
    length: 50,
  })
  aboutMe: string;

  @Column({
    nullable: true,
  })
  profileImage: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany((type) => Projects, (projects) => projects.users)
  projects: Projects[];

  @OneToMany(
    (type) => ProjectsMembers,
    (projectsMember) => projectsMember.users,
  )
  projectsMember: ProjectsMembers[];

  @OneToMany(
    (type) => ProjectsApplication,
    (projectsApplication) => projectsApplication.users,
  )
  projectsApplication: ProjectsApplication[];
}
