import { TeamNode, CharacterNode } from '../types'

import { ResolverInterface, Query, Resolver, FieldResolver } from 'type-graphql'

@Resolver(() => TeamNode)
export class TeamResolver implements ResolverInterface<TeamNode> {
  @Query(() => [TeamNode], {
    description: 'Get all the teams that characters may be in'
  })
  async allTeams(): Promise<TeamNode[]> {
    return []
  }

  @FieldResolver({ description: 'All the characters belonging to the team' })
  async characters(): Promise<CharacterNode[]> {
    return []
  }
}
