import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ParticipationStatus {
  APPROVAL = 'approval',
  CHECKING = 'checking',
  REJECT = 'reject',
}

@Entity('ProjectsParticipationManagement')
export class ProjectsParticipationManagement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean', { default: true })
  status: boolean;

  @Column()
  projectId: number;

  @Column()
  userId: number;

  @Column({ type: 'enum', enum: ParticipationStatus })
  participationStatus: ParticipationStatus;
}
