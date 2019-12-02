import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Double } from 'typeorm';

@Entity('raccolta')
export class Raccolta {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'totaleraccolta', type: 'double' })
  totaleraccolta: number;

  @Column({ name: 'totalebiglietti', type: 'integer' })
  totalebiglietti: number;

  @Column({ name: 'totalepremi', type: 'integer' })
  totalepremi: number;

}
