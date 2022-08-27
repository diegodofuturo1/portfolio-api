import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({ default: 'https://joeschmoe.io/api/v1/random' })
  avatar: string;

  @Column({ default: 'gray' })
  theme: string;
}
