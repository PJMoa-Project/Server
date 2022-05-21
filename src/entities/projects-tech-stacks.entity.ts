import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Projects } from '@app/entity';

// projects --< ProjectTechStacks
@Entity('ProjectsTechStacks')
export class ProjectsTechStacks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column({
    length: 25,
  })
  name: string;

  @ManyToOne((type) => Projects, (projects) => projects.projectsTechStacks)
  @JoinColumn({ name: 'projectId' })
  projects: Projects;
}
