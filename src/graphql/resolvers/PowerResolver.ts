import {PowerNode, CharacterNode} from '../types'

import {ResolverInterface, Query, Resolver, FieldResolver} from 'type-graphql'
import R from "ramda"
import {Ctx, Root} from "type-graphql"
import {IContext} from "../IContext"
import {Character, Power} from "../../entity"

@Resolver(() => PowerNode)
export class PowerResolver implements ResolverInterface<PowerNode> {
  @Query(() => [PowerNode], {
    description: 'Get all the teams that characters may be in'
  })
  async allPowers(@Ctx() {dao}: IContext): Promise<PowerNode[]> {
    const dbResult = await dao.findAllPowers()
    return R.map(({externalId, name, createdOn, updatedOn}: Power): PowerNode => ({
      identifier: externalId,
      createdOn,
      updatedOn,
      characters: null,
      name
    }))(dbResult)
  }

  @FieldResolver({description: 'All the characters having the power'})
  async characters(@Root(){identifier}: PowerNode, @Ctx() {dao}: IContext): Promise<CharacterNode[]> {
    const dbResult = await dao.getCharacterWithPower(identifier)
    return R.map(({externalId, name, createdOn, updatedOn}: Character): CharacterNode => ({
      identifier: externalId,
      name,
      createdOn,
      updatedOn,
      powers: null,
      teams: null
    }))(dbResult)
  }
}
