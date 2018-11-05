import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Group } from './Group';
import { Location } from './Location';

@Entity('suggestions_group')
export class GroupSuggestion {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Group, { eager: true })
  @JoinColumn({ name: 'group_id' })
  group_id: Number;

  @ManyToOne(type => Location, { eager: true })
  @JoinColumn({ name: 'location_id' })
  location_id: Location;

  @Column({ name: 'date', type: 'date', nullable: true })
  data: Date;

  @Column({ name: 'rating', type: 'double', nullable: true })
  rating: Number;

}
