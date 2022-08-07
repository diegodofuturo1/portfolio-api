import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Endpoint')
export class Endpoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  path: string;

  @Column()
  method: string;

  @Column()
  permission: string;
}
