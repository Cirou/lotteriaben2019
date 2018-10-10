import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './Group';
import { Food } from './Food';
import { User } from './User';

@Entity('votations')
export class Votation {

  @PrimaryGeneratedColumn()
  id: Number;

  @ManyToOne(type => Food, { eager: true })
  food_id: Number;

  @ManyToOne(type => User, { eager: true })
  user_id: Number;

  @Column({ name: 'date', type: 'date', nullable: true })
  data: Date;

}
