import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Food } from './Food';
import { Group } from './Group';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: true })
  nome: string;

  @Column({ name: 'surname', type: 'varchar', nullable: true })
  cognome: string;

  @Column({ name: 'email', type: 'varchar', nullable: true })
  email: string;

  @Column({ name: 'gender', type: 'varchar', nullable: true })
  sesso: string;

  @Column({ name: 'city', type: 'varchar', nullable: true })
  citta: string;

  @Column({ name: 'nickname', type: 'varchar', nullable: true })
  nickname: string;

  @Column({ name: 'image', type: 'varchar', nullable: true })
  immagine: string;

  @ManyToMany(type => Food)
  @JoinTable({
    name: 'users_foods'
  })
  foods: Food[];

  @ManyToMany(type => Group)
  @JoinTable({
    name: 'users_groups'
  })
  groups: Group[];

}
