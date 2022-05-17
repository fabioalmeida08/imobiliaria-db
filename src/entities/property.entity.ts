import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Clients } from './clients.entity'
import { Images } from './images.entity'
import { Realtor } from './realtor.entity'

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ type: 'varchar', width: 256, nullable: false })
  type: string

  @Column({ type: 'varchar', width: 256, nullable: false })
  street: string

  @Column({ type: 'varchar', width: 256, nullable: false })
  city: string

  @Column({ type: 'varchar', width: 256, nullable: false })
  state: string

  @Column({ type: 'varchar', width: 8, nullable: false })
  postal_code: string

  @Column({ type: 'varchar', width: 256, nullable: false })
  country: string

  @Column({ type: 'float', nullable: false })
  area: number

  @Column({ type: 'varchar', width: 256, nullable: false })
  complement: string

  @Column({ type: 'boolean', default: true, nullable: false })
  availability: boolean

  @Column({ type: 'varchar', width: 256, nullable: false })
  acquisition_type: string

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number

  @Column({ type: 'integer', nullable: true })
  bathroom_number: number

  @Column({ type: 'integer', nullable: true })
  bedroom_number: number

  @Column({ type: 'integer', nullable: true })
  parking_spaces: number

  @Column({ type: 'integer', nullable: true })
  elevator: number

  @Column({ type: 'boolean', default: false, nullable: true })
  party_hall: boolean

  @Column({ type: 'boolean', default: false, nullable: true })
  party_area: boolean

  @Column({ type: 'boolean', default: false, nullable: true })
  gtill: boolean

  @Column({ type: 'boolean', default: false, nullable: true })
  swimming_pool: boolean

  @Column({ type: 'boolean', default: false, nullable: true })
  gym: boolean

  @Column({ type: 'boolean', default: false, nullable: true })
  playground: boolean

  @Column({ type: 'boolean', default: false, nullable: true })
  sports_court: boolean

  @Column({ type: 'varchar', width: 1500, nullable: false })
  description: string

  @ManyToOne((type) => Clients, (clients) => clients.properties)
  client_seller: Clients

  @ManyToOne((type) => Realtor, (realtor) => realtor.properties_created)
  realtor_creator: Realtor

  @OneToMany((type) => Images, (images) => images.property, { eager: true })
  image: Images[]
}
