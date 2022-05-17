import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm'
import { Realtor } from './realtor.entity'

@Entity()
export class Agency {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ type: 'varchar', width: 256, nullable: false, unique: true })
  name: string

  @Column({ type: 'varchar', width: 11, nullable: false })
  phone_number: string

  @Column({ type: 'varchar', width: 256, nullable: false })
  email: string

  @Column({ type: 'varchar', width: 256, nullable: false })
  password: string

  @OneToMany((type) => Realtor, (realtor) => realtor.agency, { eager: true })
  @JoinTable()
  realtors: Realtor[]
}
