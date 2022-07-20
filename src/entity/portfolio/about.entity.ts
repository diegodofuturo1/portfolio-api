import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('About')
export class About {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  portfolioId: string;

  @Column()
  title: string;

  @Column()
  content: string;
}
