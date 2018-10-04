import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Location } from './Location';

@Entity('foods')
export class Food {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: true })
  nome: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  descrizione: string;

  // @ManyToMany(type => Location, {
  //   eager: true
  // })
  // @JoinTable({
  //   name: 'locations_foods'
  // })
  // locations: Location[];

}
