import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
