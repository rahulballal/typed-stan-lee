import { PowerNode, CharacterNode } from '../types'

import { ResolverInterface, Query, Resolver, FieldResolver } from 'type-graphql'

@Resolver(() => PowerNode)
export class PowerResolver implements ResolverInterface<PowerNode> {
  @Query(() => [PowerNode], {
    description: 'Get all the teams that characters may be in'
  })
  async allPower(): Promise<PowerNode[]> {
    return []
  }

  @FieldResolver({ description: 'All the characters having the power' })
  async characters(): Promise<CharacterNode[]> {
    return []
  }
}
