import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Food } from './Food';

@Entity('suggestions_user')
export class UserSuggestion {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user_id: Number;

  @ManyToOne(type => Food, { eager: true })
  @JoinColumn({ name: 'food_id' })
  food_id: Food;

  @Column({ name: 'date', type: 'date', nullable: true })
  data: Date;

  @Column({ name: 'recommended', type: 'boolean', nullable: true })
  recommended: Boolean;

}
