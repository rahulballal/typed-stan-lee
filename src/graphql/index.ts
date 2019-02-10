import { resolve } from 'path'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { GraphQLSchema } from 'graphql'
import { DataAccess } from '../data-access';
import { IContext } from './IContext';

export async function getGraphqlSchema(): Promise<GraphQLSchema> {
  return buildSchema({
    resolvers: [ `${__dirname}/resolvers/**/*.ts` ],
    emitSchemaFile: resolve(__dirname, 'schema.graphql')
  })
}

export function createServer(schema: GraphQLSchema, dao: DataAccess): ApolloServer {
  const context: IContext = { dao };
  return new ApolloServer({ schema, playground: true, context })
}
