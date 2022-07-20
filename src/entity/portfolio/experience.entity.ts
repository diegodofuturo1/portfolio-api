import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Experience')
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  portfolioId: string;

  @Column()
  company: string;

  @Column()
  role: string;

  @Column()
  image: string;

  @Column()
  duration: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  details: string;
}
