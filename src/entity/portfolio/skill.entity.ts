import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Skill')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  experienceId: string;

  @Column()
  skill: string;

  @Column()
  rating: number;
}
