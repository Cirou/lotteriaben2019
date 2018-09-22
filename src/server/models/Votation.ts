import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Group } from './Group';
import { Location } from './Location';

@Entity('votations')
export class Votation {

  @PrimaryColumn()
  @OneToOne(type => Group)
  @JoinColumn()
  group_id: number;

  @PrimaryColumn()
  @OneToOne(type => Location)
  @JoinColumn()
  location_id: number;

  @Column({ name: 'votes', type: 'integer', nullable: true })
  voti: number;

  @Column({ name: 'date', type: 'date', nullable: true })
  data: Date;

}
