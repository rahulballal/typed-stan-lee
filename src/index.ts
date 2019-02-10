import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { seedDb } from './util/seed-db'
import { getGraphqlSchema, createServer } from './graphql'

createConnection()
  .then(async connection => {
    console.log('Syncing up database entities')
    await seedDb(connection)
    console.info('Seeded database')
    const schema = await getGraphqlSchema()
    const { url } = await createServer(schema).listen(process.env.PORT || 4000)
    console.info(`Yo, marvel universe is available at ${url}`)
  })
  .catch(error => console.log(error))
