import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Clients } from "./clients.entity"
import { Property } from "./property.entity"
import { Realtor } from "./realtor.entity"

@Entity()
export class Sales {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  selling_value: number

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  down_payment: number

  @Column({ type: "varchar", width: 1500, nullable: false })
  description: string

  @ManyToMany((type) => Realtor, (realtor) => realtor.sales, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  realtors: Realtor[]

  @OneToOne((type) => Property, { eager: true })
  @JoinColumn()
  property: Property

  @ManyToOne((type) => Clients, (clients) => clients.buyers)
  client_buyer: Clients
}
