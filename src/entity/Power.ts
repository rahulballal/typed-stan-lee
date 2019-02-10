import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany
} from 'typeorm'
import { Character } from './Chararcter';

@Entity()
export class Power extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ length: 14 })
  public externalId: string

  @Column()
  public name: string

  @ManyToMany(() => Character, ({ powers }) => powers)
  public characters: Character[]

  @CreateDateColumn()
  public createdOn: Date

  @UpdateDateColumn({ nullable: true })
  public updatedOn?: Date
}
