import { Character, Afilliation } from '../entity'
import faker from 'faker'

export class EntityFaker {
  fakeCharacter({
    id = faker.random.number(),
    name = faker.name.firstName(),
    externalId = faker.internet.password(6),
    afilliation = faker.helpers.randomize(
      Object.keys(Afilliation)
    ) as Afilliation,
    powers = [],
    teams = [],
    createdOn = faker.date.recent(),
    updatedOn = faker.date.future()
  }: Partial<Character>): Character {
    const char = new Character()
    char.afilliation = afilliation
    char.createdOn = createdOn
    char.externalId = externalId
    char.id = id
    char.name = name
    char.powers = powers
    char.teams = teams
    char.updatedOn = updatedOn

    return char;
  }
}
