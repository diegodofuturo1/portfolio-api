import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TestParam')
export class TestParam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  testId: string;

  @Column()
  paramId: string;

  @Column()
  value: string;
}
