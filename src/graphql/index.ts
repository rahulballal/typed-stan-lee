import { ApolloServer } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import { resolve } from 'path';
import { buildSchema, formatArgumentValidationError } from 'type-graphql';
import { DataAccess } from '../data-access';
import { CharacterResolver, PowerResolver, TeamResolver } from './resolvers';
import { IContext } from './IContext';

export async function getGraphqlSchema(): Promise<GraphQLSchema> {
  return buildSchema({
    resolvers: [CharacterResolver, PowerResolver, TeamResolver],
    emitSchemaFile: resolve(__dirname, 'schema.graphql')
  })
}

export function createServer(
  schema: GraphQLSchema,
  dao: DataAccess
): ApolloServer {
  return new ApolloServer({
    schema,
    playground: true,
    formatError: formatArgumentValidationError,
    context: ({ req, res }: any): IContext => ({ req, res, dao })
  })
}
