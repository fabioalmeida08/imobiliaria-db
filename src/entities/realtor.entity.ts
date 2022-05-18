import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Agency } from './agency.entity'
import { Clients } from './clients.entity'
import { Property } from './property.entity'
import { Sales } from './sales.entity'

@Entity()
export class Realtor {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ type: 'varchar', width: 256, nullable: false })
  name: string

  @Column({ type: 'varchar', width: 11, nullable: false })
  phone_number: string

  @Column({ type: 'varchar', width: 256, nullable: false, unique: true })
  email: string

  @Column({ type: 'varchar', width: 256, nullable: false })
  password: string

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date

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
