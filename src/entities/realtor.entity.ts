import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Agency } from './agency.entity'
import { Clients } from './clients.entity'
import { Property } from './property.entity'
import { Sales } from './sales.entity'

@Entity()
export class Realtor {
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

  @ManyToOne((type) => Agency, (agency) => agency.realtors)
  agency: Agency

  @OneToMany((type) => Clients, (clients) => clients.realtor)
  clients: Clients[]

  @OneToMany((type) => Property, (property) => property.realtor_creator, {
    eager: true,
  })
  properties_created: Property[]

  @ManyToMany((type) => Sales, (sales) => sales.realtors)
  sales: Sales[]
}
