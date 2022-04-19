import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
