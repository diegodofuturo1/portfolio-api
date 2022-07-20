import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Portfolio')
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  owner: string;

  @Column()
  userId: string;

  @Column()
  avatar: string;
}
