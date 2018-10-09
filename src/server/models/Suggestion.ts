import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Group } from './Group';
import { Location } from './Location';

@Entity('suggestions')
export class Suggestion {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Group, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user_id: Number;

  @ManyToOne(type => Location, { eager: true })
  @JoinColumn({ name: 'food_id' })
  food_id: Number;

  @Column({ name: 'date', type: 'date', nullable: true })
  data: Date;

}
