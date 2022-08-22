import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Test')
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  endpointId: string;

  @Column()
  groupId: string;

  @Column()
  text: string;

  @Column()
  order: number;

  @Column()
  expect: number;
}
