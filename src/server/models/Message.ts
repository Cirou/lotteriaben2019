import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Group } from './Group';
import { User } from './User';

@Entity('messages')
export class Message {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Group)
  @JoinColumn()
  group_id: number;

  @OneToOne(type => User)
  @JoinColumn()
  user_id: User;

  @Column({ name: 'text', type: 'varchar', nullable: true })
  text: string;

  @Column({ name: 'date', type: 'date', nullable: true })
  data: Date;

}
