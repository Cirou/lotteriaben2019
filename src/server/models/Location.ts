import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Food } from './Food';

@Entity('locations')
export class Location {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: true })
  nome: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  descrizione: string;

  @Column({ name: 'address', type: 'varchar', nullable: true })
  indirizzo: string;

  @Column({ name: 'email', type: 'varchar', nullable: true })
  email: string;

  @Column({ name: 'phone_number', type: 'varchar', nullable: true })
  tel_fisso: string;

  @Column({ name: 'mobile_number', type: 'varchar', nullable: true })
  tel_mobile: string;

  @Column({ name: 'position_x', type: 'double', nullable: true })
  posizione_x: number;

  @Column({ name: 'position_y', type: 'double', nullable: true })
  posizione_y: number;

  @ManyToMany(type => Food, {eager: true})
  @JoinTable({name: 'locations_foods'})
  foods: Food[];

}
