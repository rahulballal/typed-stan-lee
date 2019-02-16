import {TeamNode, CharacterNode} from '../types'

import {ResolverInterface, Query, Resolver, FieldResolver, Ctx, Root} from 'type-graphql'
import {IContext} from "../IContext";
import {Character, Team} from "../../entity";
import R from 'ramda';

@Resolver(() => TeamNode)
export class TeamResolver implements ResolverInterface<TeamNode> {
  @Query(() => [TeamNode], {
    description: 'Get all the teams that characters may be in'
  })
  async allTeams(@Ctx() {dao}: IContext): Promise<TeamNode[]> {
    return dao.findAllTeams().then((dbTeams: Team[]): TeamNode[] => {
      return R.map(({externalId, name, updatedOn, createdOn}: Team): TeamNode => ({
        identifier: externalId,
        name,
        updatedOn,
        createdOn,
        characters: null
      }))(dbTeams);
    })
  }

  @FieldResolver({description: 'All the characters belonging to the team'})
  async characters(
    @Root() {identifier}: TeamNode,
    @Ctx() {dao}: IContext
  ): Promise<CharacterNode[]> {
    return dao.getCharacterWithTeam(identifier).then((dbChars: Character[]): CharacterNode[] => {
      return R.map(({externalId, name, createdOn, updatedOn}: Character): CharacterNode => ({
        identifier: externalId,
        teams: null,
        powers: null,
        updatedOn,
        createdOn,
        name
      }))(dbChars)
    })
  }
}
