import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('tips')
export class Tip {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'text', type: 'varchar', nullable: true })
  text: string;

}
