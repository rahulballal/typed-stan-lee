import { Connection } from 'typeorm'
import { Character, Power, Team } from '../entity'

export class DataAccess {
  constructor(private readonly dbCon: Connection) {}

  public findAllCharacters(): Promise<Character[]> {
    return this.dbCon
      .getRepository(Character)
      .createQueryBuilder("characters")
      .orderBy("characters.createdOn", "ASC")
      .getMany()
  }
  public getCharacterPowers(characterId: string): Promise<Power[]> {
    console.info({ characterId })
    return this.dbCon
      .getRepository(Power)
      .createQueryBuilder('pow')
      .innerJoin('pow.characters', 'characters')
      .where('characters.externalId = :characterId', { characterId })
      .getMany()
  }
  public getCharacterTeams(characterId: string): Promise<Power[]> {
    return this.dbCon
      .getRepository(Team)
      .createQueryBuilder('team')
      .innerJoin('team.characters', 'characters')
      .where('characters.externalId = :characterId', { characterId })
      .getMany()
  }
  public findAllPowers(): Promise<Power[]> {
    return this.dbCon
      .getRepository(Power)
      .createQueryBuilder()
      .getMany()
  }

  public getCharacterWithPower(powerId: string): Promise<Character[]> {
    return this.dbCon
      .getRepository(Character)
      .createQueryBuilder("chars")
      .innerJoin("chars.powers", "pow")
      .where("pow.externalId = :powerId", {powerId})
      .getMany()

  }

  public getCharacterWithTeam( teamId: string): Promise<Character[]> {
    return this.dbCon
      .getRepository(Character)
      .createQueryBuilder("chars")
      .innerJoin("chars.teams", "team")
      .where("team.externalId = :teamId", {teamId})
      .getMany()
  }
  public findAllTeams(): Promise<Team[]> {
    return this.dbCon
      .getRepository(Team)
      .createQueryBuilder()
      .getMany()
  }
}

export function createDAO(connection: Connection) {
  return new DataAccess(connection)
}
