import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import { Group } from './Group';
import { Food } from './Food';
import { User } from './User';

@Entity('votations')
export class Votation {

  @PrimaryColumn()
  @ManyToOne(type => Group, { eager: true })
  group_id: Number;

  @PrimaryColumn()
  @ManyToOne(type => Food, { eager: true })
  food_id: Number;

  @PrimaryColumn()
  @ManyToOne(type => User, { eager: true })
  user_id: Number;

  @Column({ name: 'date', type: 'date', nullable: true })
  data: Date;

}
