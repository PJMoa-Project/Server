import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// NOTE: projects --< ProjectTechStacks
@Entity('ProjectTechStacks')
export class ProjectTechStacks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column({
    length: 25,
  })
  name: string;
}
