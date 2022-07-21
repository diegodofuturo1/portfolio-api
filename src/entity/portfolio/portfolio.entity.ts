import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Portfolio')
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  owner: string;

  @Column()
  avatar: string;
}
