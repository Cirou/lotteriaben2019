import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Group } from './Group';
import { User } from './User';

@Entity('messages')
export class Message {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Group)
  group: Group;

  @ManyToOne(type => User)
  user: User;

  @Column({ name: 'text', type: 'varchar', nullable: true })
  text: string;

  @Column({ name: 'date', type: 'date', nullable: true })
  data: Date;

}
