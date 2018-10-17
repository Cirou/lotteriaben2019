import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';

@Entity('groups')
export class Group {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: true })
  nome: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  descrizione: string;

  @Column({ name: 'image', type: 'varchar', nullable: true })
  immagine: string;

  @ManyToMany(type => User)
  @JoinTable({ name: 'users_groups' })
  users: User[];

}
