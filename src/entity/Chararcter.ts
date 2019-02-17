import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'

import { Power } from './Power'
import { Team } from './Team'

export enum Afilliation {
  GOOD = "GOOD",
  EVIL = "EVIL",
  UNKNOWN = "UNKNOWN"
}

@Entity()
export class Character extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public name: string

  @Column({ length: 14 })
  public externalId: string

  @Column({ default: Afilliation.UNKNOWN, length: 10 })
  public afilliation: Afilliation

  @ManyToMany(() => Power, ({ characters}) => characters)
  @JoinTable()
  public powers: Power[]

  @ManyToMany(() => Team, ({ characters }) => characters)
  @JoinTable()
  public teams: Team[]

  @CreateDateColumn()
  public createdOn: Date

  @UpdateDateColumn({ nullable: true })
  public updatedOn?: Date
}
