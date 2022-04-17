import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// NOTE: projects --< techStacks
@Entity('TechStacks')
export class TechStacks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column({
    length: 25,
  })
  techStack: string;
}
