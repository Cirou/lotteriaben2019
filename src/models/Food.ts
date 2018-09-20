import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('foods')
export class Food {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: true })
  nome: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  descrizione: string;

}
