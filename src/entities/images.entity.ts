import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Property } from './property.entity'

@Entity()
export class Images {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ type: 'varchar', width: 1500, nullable: false })
  img_url: string

  @ManyToOne((type) => Property, (property) => property.image)
  property: Property
}
