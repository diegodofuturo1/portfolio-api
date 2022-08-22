import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TestGroup')
export class TestGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  text: string;
}
