import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Group } from './Group';
import { Location } from './Location';

@Entity('suggestions_group')
export class GroupSuggestion {

  @PrimaryColumn()
  @ManyToOne(type => Group, { eager: true })
  @JoinColumn({ name: 'group_id' })
  group_id: Number;

  @PrimaryColumn()
  @ManyToOne(type => Location, { eager: true })
  @JoinColumn({ name: 'location_id' })
  location_id: Location;

  @PrimaryColumn()
  @Column({ name: 'date', type: 'date', nullable: true })
  data: Date;

  @Column({ name: 'rating', type: 'double', nullable: true })
  rating: Number;

}
