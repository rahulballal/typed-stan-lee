import {
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany
} from 'typeorm'
import { Character } from './Chararcter';

@Entity()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public name: string

  @Column({ length: 14 })
  public externalId: string

  @ManyToMany(() => Character, ({teams}) => teams)
  public characters: Character[]

  @CreateDateColumn()
  public createdOn: Date

  @UpdateDateColumn({ nullable: true })
  public updatedOn?: Date
}
