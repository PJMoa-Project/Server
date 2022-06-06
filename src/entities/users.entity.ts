import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import {
  Projects,
  ProjectsApplication,
  ProjectsLike,
  ProjectsMembers,
  Oauth,
} from '@app/entity';

@Entity('Users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean', { default: true })
  status: boolean;

  @Column({
    nullable: true,
  })
  @Index({ unique: true })
  email: string | null;

  @Column('text', {
    nullable: true,
  })
  password: string | null;

  @Column({
    nullable: true,
    length: 10,
  })
  name: string | null;

  @Column({
    nullable: true,
    length: 11,
  })
  @Index({ unique: true })
  mobile: string | null;

  @Column({
    nullable: true,
  })
  gitUrl: string | null;

  @Column({
    nullable: true,
    length: 50,
  })
  aboutMe: string | null;

  @Column({
    nullable: true,
  })
  profileImage: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Oauth, (oauth) => oauth.users)
  oauth: Oauth;

  @OneToMany(() => Projects, (projects) => projects.users)
  projects: Projects[];

  @OneToMany(() => ProjectsMembers, (projectsMember) => projectsMember.users)
  projectsMembers: ProjectsMembers[];

  @OneToMany(
    () => ProjectsApplication,
    (projectsApplication) => projectsApplication.users,
  )
  projectsApplication: ProjectsApplication[];

  @OneToMany(() => ProjectsLike, (projectsLike) => projectsLike.users)
  projectsLike: ProjectsLike[];
}
