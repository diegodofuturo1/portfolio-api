import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Education')
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  portfolioId: string;

  @Column()
  school: string;

  @Column()
  classroom: string;

  @Column()
  image: string;

  @Column()
  nivel: string;

  @Column()
  duration: string;

  @Column()
  period: string;

  @Column()
  details: string;
}
