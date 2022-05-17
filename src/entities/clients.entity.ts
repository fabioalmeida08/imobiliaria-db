import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Property } from './property.entity'
import { Realtor } from './realtor.entity'
import { Sales } from './sales.entity'

@Entity()
export class Clients {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ type: 'varchar', width: 256, nullable: false })
  name: string

  @Column({ type: 'varchar', width: 11, nullable: false })
  phone_number: string

  @Column({ type: 'varchar', width: 256, nullable: false })
  email: string

  @Column({ type: 'varchar', width: 256, nullable: false })
  intention: string

  @ManyToOne((type) => Realtor, (realtor) => realtor.clients)
  realtor: Realtor

  @OneToMany((type) => Property, (property) => property.client_seller, {
    eager: true,
  })
  properties: Property[]

  @OneToMany((type) => Sales, (sales) => sales.client_buyer, {
    eager: true,
  })
  buyers: Sales[]
}
