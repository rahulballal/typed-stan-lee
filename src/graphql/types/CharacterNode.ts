import { ObjectType, Field } from 'type-graphql'
import { PowerNode } from './PowerNode'
import { TeamNode } from './TeamNode'

@ObjectType({ description: 'A character in the marvel universe' })
export class CharacterNode {
  @Field()
  identifier: string

  @Field()
  name: string

  @Field()
  createdOn: Date

  @Field()
  updatedOn: Date

  @Field(() => [PowerNode])
  powers: PowerNode[]

  @Field(() => [TeamNode])
  teams: TeamNode[]
}
