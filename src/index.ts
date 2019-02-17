import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { getGraphqlSchema, createServer } from './graphql'
import { createDAO } from './data-access'

const name = process.env.NODE_ENV === 'development' ? 'default' : 'production'

console.info(`Connected to ${name} database`)

createConnection(name)
  .then(async connection => {
    const schema = await getGraphqlSchema()
    const { url } = await createServer(schema, createDAO(connection)).listen(
      process.env.PORT || 4000
    )
    console.info(`Yo, marvel universe is available at ${url}`)
  })
  .catch(error => console.log(error))
