import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Param')
export class Param {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  endpointId: string;

  @Column()
  key: string;

  @Column()
  value: string;

  @Column()
  type: string;
}
