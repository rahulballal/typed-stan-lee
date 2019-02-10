import { resolve } from 'path'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { CharacterResolver } from './resolvers'
import { GraphQLSchema } from 'graphql'

export async function getGraphqlSchema(): Promise<GraphQLSchema> {
  return buildSchema({
    resolvers: [CharacterResolver],
    emitSchemaFile: resolve(__dirname, 'schema.graphql')
  })
}

export function createServer(schema: GraphQLSchema): ApolloServer {
  return new ApolloServer({ schema, playground: true })
}
