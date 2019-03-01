import { mock, instance, when } from 'ts-mockito'
import { DataAccess } from '../../data-access'
import { CharacterResolver } from './CharacterResolver'
import { IContext } from '../IContext'
import { times, map, prop } from 'ramda'
import { EntityFaker } from '../../test-utils'
import { Character } from '../../entity'

describe('CharacterResolver', () => {
  const enFaker: EntityFaker = new EntityFaker()

  it('all character resolver with no result', async () => {
    const DAO = mock(DataAccess)
    const dao = instance(DAO)

    when(DAO.findAllCharacters()).thenResolve([])

    const ctx: IContext = { dao }
    const resolvers = new CharacterResolver()

    const actual = await resolvers.allCharacters(ctx)

    expect(actual).toEqual([])
  })

  it('all character resolver with some result', async () => {

    const DAO = mock(DataAccess)
    const dao = instance(DAO)
    const dbData = times<Character>(() => enFaker.fakeCharacter({}), 5)

    when(DAO.findAllCharacters()).thenResolve(dbData)

    const ctx: IContext = { dao }
    const resolvers = new CharacterResolver()

    const result = await resolvers.allCharacters(ctx)
    const expected = map(prop('externalId'))(dbData)
    const actual = map(prop('identifier'))(result)

    expect(actual).toEqual(expected)
  })
})
