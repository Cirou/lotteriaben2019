import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('premi')
export class Premi {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'posizione', type: 'integer' })
  posizione: number;

  @Column({ name: 'nomepremio', type: 'varchar' })
  nomepremio: string;

  @Column({ name: 'descrizionepremio', type: 'varchar' })
  descrizionepremio: string;

  @Column({ name: 'immaginepremio', type: 'varchar' })
  immaginepremio: string;

  @Column({ name: 'immaginebase64', type: 'blob' })
  immaginebase64: string;

  @Column({ name: 'numerovincitore', type: 'varchar', nullable: true })
  numerovincitore: string;

  @Column({ name: 'nomevincitore', type: 'varchar', nullable: true })
  nomevincitore: string;

}
