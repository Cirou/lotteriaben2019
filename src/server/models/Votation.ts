import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Group } from './Group';
import { Food } from './Food';
import { User } from './User';

@Entity('votations')
export class Votation {

  @PrimaryColumn()
  @OneToOne(type => Group, { eager: true })
  @JoinColumn()
  group_id: Group;

  @PrimaryColumn()
  @OneToOne(type => Food, { eager: true })
  @JoinColumn()
  food_id: Food;

  @PrimaryColumn()
  @OneToOne(type => User, { eager: true })
  @JoinColumn()
  user_id: User;

  @Column({ name: 'date', type: 'date', nullable: true })
  data: Date;

}
