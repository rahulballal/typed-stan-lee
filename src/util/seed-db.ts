import { Connection } from 'typeorm'
import * as shortid from "shortid32";
import { Team } from '../entity/Team'
import { Power } from '../entity/Power'
import { Character } from '../entity/Chararcter';
import { Afilliation } from '../entity/Afilliation';

export const seedDb = async (conn: Connection): Promise<void> => {

  const avengers = new Team()
  avengers.name = "Avengers"
  avengers.externalId = shortid.generate()
  await conn.manager.save(avengers)

  const guardians = new Team()
  guardians.name = "Guardians of the Galaxy"
  guardians.externalId = shortid.generate()
  await conn.manager.save(guardians)

  const superStrength = new Power()
  superStrength.name = "Super Strength"
  superStrength.externalId = shortid.generate()
  await conn.manager.save(superStrength)
  
  const superHealing = new Power()
  superHealing.name = "Super Healing"
  superHealing.externalId = shortid.generate()
  await conn.manager.save(superHealing)
  
  const superIntelligence = new Power()
  superIntelligence.name = "Super Strength"
  superIntelligence.externalId = shortid.generate()
  await conn.manager.save(superIntelligence)

  const captainAmerica = new Character()
  captainAmerica.name = "Captain America"
  captainAmerica.externalId = shortid.generate()
  captainAmerica.afilliation = Afilliation.GOOD
  captainAmerica.teams = [avengers]
  captainAmerica.powers = [superStrength, superHealing, superIntelligence]
  await conn.manager.save(captainAmerica)

  const hulk = new Character()
  hulk.name = "The Incredible Hulk"
  hulk.externalId = shortid.generate()
  hulk.afilliation = Afilliation.GOOD
  hulk.teams = [avengers]
  hulk.powers = [superStrength, superHealing, superIntelligence]
  await conn.manager.save(hulk)

  const raccoon = new Character()
  raccoon.name = "Raccoon"
  raccoon.externalId = shortid.generate()
  raccoon.afilliation = Afilliation.UNKNOWN
  raccoon.powers = [superIntelligence]
  await conn.manager.save(raccoon)
}
