import {
  ResolverInterface,
  Resolver,
  Query,
  FieldResolver,
  Root,
  Ctx
} from 'type-graphql'
import { CharacterNode, PowerNode, TeamNode } from '../types'
import { IContext } from '../IContext'
import R from 'ramda'
import { Character, Power, Team } from '../../entity'

@Resolver(() => CharacterNode)
export class CharacterResolver implements ResolverInterface<CharacterNode> {
  @Query(() => [CharacterNode], {
    description: 'Get all the characters in marvel universe'
  })
  async allCharacters(@Ctx() { dao }: IContext): Promise<CharacterNode[]> {
    const dbResult = await dao.findAllCharacters()
    return R.map(
      (item: Character): CharacterNode => {
        return {
          identifier: item.externalId,
          createdOn: item.createdOn,
          name: item.name,
          powers: null,
          teams: null,
          updatedOn: item.updatedOn
        }
      }
    )(dbResult)
  }

  @FieldResolver()
  async powers(
    @Root() { identifier }: CharacterNode,
    @Ctx() { dao }: IContext
  ): Promise<PowerNode[]> {
    const dbResult = await dao.getCharacterPowers(identifier)
    return R.map(
      (item: Power): PowerNode => {
        return {
          identifier: item.externalId,
          createdOn: item.createdOn,
          name: item.name,
          updatedOn: item.updatedOn,
          characters: null
        }
      }
    )(dbResult)
  }

  @FieldResolver()
  async teams(@Root() { identifier }: CharacterNode, @Ctx() { dao }: IContext): Promise<TeamNode[]> {
    const dbResult = await dao.getCharacterTeams(identifier)
    return R.map(
      (item: Team): TeamNode => {
        return {
          identifier: item.externalId,
          createdOn: item.createdOn,
          name: item.name,
          updatedOn: item.updatedOn,
          characters: null
        }
      }
    )(dbResult)
  }
}
