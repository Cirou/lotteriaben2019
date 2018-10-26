import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './Group';
import { Food } from './Food';
import { User } from './User';

@Entity('votations')
export class Votation {

  @PrimaryGeneratedColumn()
  id: Number;

  @ManyToOne(type => Food, { eager: true })
  @JoinColumn({name: 'food_id'})
  food_id: Food;

  @ManyToOne(type => User, { eager: true })
  @JoinColumn({name: 'user_id'})
  user_id: Number;

  @Column({ name: 'date', type: 'date', nullable: true })
  data: Date;

}
